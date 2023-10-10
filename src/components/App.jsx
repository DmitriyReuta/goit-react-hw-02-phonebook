import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  number: Yup.number().required('Phone number is required'),
});

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
        <Formik
          initialValues={{ name: '', number: '' }}
          validationSchema={validationSchema}
          onSubmit={this.handleAddContact}
        >
          <Form>
              <Field type="text" name="name" placeholder="Name" />
              <ErrorMessage name="name" />
              <Field type="text" name="number" placeholder="Phone Number" />
              <ErrorMessage name="number" />
              <button type="submit">Add Contact</button>
            </Form>

        </Formik>

        <h2>Contacts</h2>
        <input
          type="text"
          placeholder="Search Contacts"
          value={filter}
          onChange={this.handleFilterChange}
        />

        <ul>
          {filteredContacts.map((contact) => (
            <li key={contact.id}>
              {contact.name}: {contact.number}
              <button
                type="button"
                onClick={() => this.handleDeleteContact(contact.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}