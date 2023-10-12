import React from 'react';

export const ContactList = ({contacts ,DeleteContact}) => {
    return (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              {contact.name}: {contact.number}
              <button
                type="button"
                onClick={() => DeleteContact(contact.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
    )
}