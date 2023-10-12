import React, { Component } from 'react';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';

function generateUniqueId(contacts) {
  return contacts.reduce((maxId, contact) => Math.max(maxId, contact.id), 0) + 1;
}

export class App extends Component {
      state = {
      contacts: [
        { id: 1, name: 'Rosie Simpson', number: '459-12-56' },
        { id: 2, name: 'Hermione Kline', number: '443-89-12' },
        { id: 3, name: 'Eden Clements', number: '645-17-79' },
        { id: 4, name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
    };

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  handleDeleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== contactId),
    }));
  };

  handleAddContact = (values, { resetForm }) => {
    const { name, number } = values;
    const { contacts } = this.state;

    if (contacts.some((contact) => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: generateUniqueId(contacts),
      name,
      number,
    };

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
    }));
    resetForm();
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm AddContact={this.handleAddContact}/>

        <h2>Contacts</h2>
       <Filter filter={filter} onChange={this.handleFilterChange}/>
       <ContactList contacts={filteredContacts} DeleteContact={this.handleDeleteContact}/>
      </div>
    );
  }
}