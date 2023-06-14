import React, { Component } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filter: "",
    };
  }

  componentDidMount() {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
    this.propTypes = {
      contacts: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          number: PropTypes.string.isRequired,
        }).isRequired
      ),
      filter: PropTypes.string.isRequired,
      handleChange: PropTypes.func.isRequired,
      handleAddContact: PropTypes.func.isRequired,
      handleDeleteContact: PropTypes.func.isRequired,
      filteredNames: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          number: PropTypes.string.isRequired,
        }).isRequired
      ),
    };
  }
  componentDidUpdate() {
    const { contacts } = this.state;
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  componentWillUnmount() {
    localStorage.removeItem("contacts");
  }

  handleChange = (evt) => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleAddContact = (name, number) => {
    this.setState((prevState) => ({
      contacts: [
        ...prevState.contacts,
        { id: nanoid(10), name: name, number: number },
      ],
    }));
  };

  handleDeleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };
  render() {
    const tempContacts = this.state.contacts.slice();
    const filteredNames = tempContacts.filter((contact) =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <>
        <div>
          <h1>Phonebook</h1>
          <ContactForm
            contactList={this.handleAddContact}
            contacts={this.state.contacts}
          />
          <h2 className="contactListTitle">Contacts</h2>
          <Filter filter={this.state.filter} handleChange={this.handleChange} />
          <ContactList
            filteredNames={filteredNames}
            onDelete={this.handleDeleteContact}
          />
        </div>
      </>
    );
  }
}

export default App;
