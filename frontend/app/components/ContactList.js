import React, { Component, Fragment, useState, useEffect } from "react";
import { Table } from "reactstrap";
import NewContactModal from "./NewContactModal";
import { Col, Container, Row } from "reactstrap";
import ConfirmRemovalModal from "./ConfirmRemovalModal";

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
  }

  updateSearch(event) {
    this.setState({
      search: event.target.value.substr(0, 30)
    });
  }

  handleChangePage(event, newPage) {
    this.setState({ setPage: newPage })
  };

  handleChangeRowsPerPage(event) {
    this.setState(
      {
        setRowsPerPage: event.target.value + 1,
        setPage: 0
      }
    )
  };

  render() {
    let filteredContacts = this.props.contacts.filter(
      (contact) => {
        return (
          (contact.name.toLowerCase().indexOf(
            this.state.search.toLowerCase()) != -1))
          ||
          (contact.phone.indexOf(
            this.state.search) != -1)
          ;
      }
    );
    return (
      <Fragment>
        <div className="row1">
          <Row
            style={{ margin: "auto", width: "70%" }}
          >
            <Col>
            
              <div className="active-cyan-3 active-cyan-4 mb-4">
                <input type="input-group"
                  className="form-control f1"
                  placeholder="Filter"
                  value={this.state.search}
                  onChange={this.updateSearch.bind(this)}
                  name="filter" />
              </div>
            </Col>
            <Col>
              <NewContactModal create={true} resetState={this.props.resetState} />
            </Col>
          </Row>
        </div>

        <Table dark>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!filteredContacts || filteredContacts.length <= 0 ? (
              <tr>
                <td colSpan="6" align="center">
                  <b>No Contacts Found!</b>
                </td>
              </tr>
            ) : (
                filteredContacts.map(contact => (
                  <tr key={contact.pk}>
                    <td>{contact.name}</td>
                    <td>{contact.phone}</td>
                    <td align="center">
                      <NewContactModal
                        create={false}
                        contact={contact}
                        resetState={this.props.resetState}
                      />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                        pk={contact.pk}
                        resetState={this.props.resetState}
                      />
                    </td>
                  </tr>
                ))
              )}
          </tbody>

        </Table>
      </Fragment>

    );
  }
}

export default ContactList;
