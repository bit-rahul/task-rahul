import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewContactForm extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      pk: 0,
      name: "",
      phone: ""
    };
    this.onChange = this.onChange.bind(this);
    this.createContact = this.createContact.bind(this)
    this.editContact = this.editContact.bind(this)
    this.defaultIfEmpty = this.defaultIfEmpty.bind(this)
  }

  componentDidMount() {
    if (this.props.contact) {
      const { pk, name, phone } = this.props.contact;
      this.setState({ pk, name, phone });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  };

  createContact(e) {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editContact(e) {
    e.preventDefault();
    axios.put(API_URL + this.state.pk, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty(value) {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.contact ? this.editContact : this.createContact}>
        <FormGroup>
          <Label for="name">Name:</Label>
          <Input
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone:</Label>
          <Input
            type="text"
            name="phone"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.phone)}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewContactForm;
