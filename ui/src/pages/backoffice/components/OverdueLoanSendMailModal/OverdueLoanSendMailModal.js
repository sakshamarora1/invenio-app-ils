import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Modal, Button, Icon } from 'semantic-ui-react';
import { BackOfficeRoutes } from '@routes/urls';

export default class OverdueLoanSendMailModal extends Component {
  state = { isModalOpen: false };

  toggle = () => this.setState({ isModalOpen: !this.state.isModalOpen });

  sendMail = async () => {
    const { loan } = this.props;
    this.toggle();
    this.props.sendOverdueLoansMailReminder({
      loanPid: loan.metadata.pid,
    });
  };

  renderTrigger = () => (
    <Button
      size="small"
      icon
      color="purple"
      title="Send a reminder email to the user of the loan"
      onClick={this.toggle}
    >
      <Icon name="mail" />
    </Button>
  );

  render() {
    const { loan } = this.props;
    return (
      <Modal trigger={this.renderTrigger()} open={this.state.isModalOpen}>
        <Modal.Header>Email notification</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>
              <Link
                to={BackOfficeRoutes.loanDetailsFor(loan.metadata.pid)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Loan
              </Link>
              {' on '}
              <Link
                to={BackOfficeRoutes.itemDetailsFor(loan.metadata.item_pid)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Item
              </Link>
              {' is overdue!'}
            </Header>
            <p>
              {'An email reminder will be sent to '}
              <strong>
                <Link
                  to={BackOfficeRoutes.patronDetailsFor(
                    loan.metadata.patron_pid
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Patron
                </Link>
              </strong>
              !
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={this.toggle}>
            <Icon name="cancel" /> Cancel
          </Button>
          <Button color="green" onClick={this.sendMail}>
            <Icon name="send" /> Send
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
