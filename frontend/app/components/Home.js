import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import ContactList from "./ContactList";
import NewContactModal from "./NewContactModal";

import axios from "axios";

import { API_URL } from "../constants";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      search: ''
    };
    this.getContacts = this.getContacts.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentDidMount() {
    this.resetState();
    this.getContacts();
  }

  updateSearch(event) {
    this.setState({
      search: event.target.value.substr(0, 30)
    });
  }

  getContacts() {
    axios.get("http://127.0.0.1:8000/api/contacts/")
      .then(res => this.setState({ contacts: res.data }))
      .catch(err => console.log("ERROR", err))
  };

  resetState() {
    this.getContacts();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <div className="text-center1">
          <h3>Contacts Table</h3>
        </div>
        <Row>
          <Col>
            <ContactList
              contacts={this.state.contacts}
              resetState={this.resetState}
            />
          </Col>
        </Row>

      </Container>
    );
  }
}

export default Home;
