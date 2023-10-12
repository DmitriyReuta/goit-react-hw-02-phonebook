import React from 'react';
export const Filter = ({ filter, onChange }) => {
    return (
        <input
          type="text"
          placeholder="Search Contacts"
          value={filter}
          onChange={onChange}
        />
    )
}