import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { generatePath } from 'react-router';
import { Loader, Error } from '../../../../../../common/components';
import { ResultsTable } from '../../../../../../common/components';
import { document as documentApi } from '../../../../../../common/api';
import {
  BackOfficeURLS,
  documentsSearchQueryUrl,
} from '../../../../../../common/urls';
import { formatter } from '../../../../../../common/components/ResultsTable/formatters';
import { SeeAllButton } from '../../../../components/buttons';

export default class OverbookedDocumentsList extends Component {
  constructor(props) {
    super(props);
    this.fetchOverbookedDocuments = props.fetchOverbookedDocuments;
    this.showDetailsUrl = BackOfficeURLS.documentDetails;
    this.seeAllUrl = documentsSearchQueryUrl;
  }

  componentDidMount() {
    this.fetchOverbookedDocuments();
  }

  _showDetailsHandler = document_pid =>
    this.props.history.push(
      generatePath(this.showDetailsUrl, { documentPid: document_pid })
    );

  _seeAllButton = () => {
    const _click = () =>
      this.props.history.push(
        this.seeAllUrl(
          documentApi
            .query()
            .overbooked()
            .qs()
        )
      );

    return <SeeAllButton clickHandler={() => _click()} />;
  };

  prepareData() {
    return this.props.data.map(row => formatter.document.toTable(row));
  }

  _render_table() {
    const rows = this.prepareData();
    return (
      <ResultsTable
        rows={rows}
        title={'Overbooked documents'}
        subtitle={
          'Documents with more requests than the number of available items for loan.'
        }
        rowActionClickHandler={this._showDetailsHandler}
        seeAllComponent={this._seeAllButton()}
        showMaxRows={this.props.showMaxEntries}
        fixed
        singleLine
      />
    );
  }

  render() {
    const { data, isLoading, hasError } = this.props;
    const errorData = hasError ? data : null;
    return (
      <Loader isLoading={isLoading}>
        <Error error={errorData}>{this._render_table()}</Error>
      </Loader>
    );
  }
}

OverbookedDocumentsList.propTypes = {
  fetchOverbookedDocuments: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  showMaxEntries: PropTypes.number,
};

OverbookedDocumentsList.defaultProps = {
  showMaxEntries: 5,
};