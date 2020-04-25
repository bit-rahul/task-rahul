import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewContactForm from "./NewContactForm";

class NewContactModal extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const create = this.props.create;

    var title = "Editing Contact";
    var button = <Button onClick={this.toggle}>Edit</Button>;
    if (create) {
      title = "Creating New Contact";

      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          Create New
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewContactForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              contact={this.props.contact}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewContactModal;
