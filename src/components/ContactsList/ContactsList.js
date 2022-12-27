import React, { useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import ContactsEditor from '../ContactsEditor/ContactsEditor';
import ContactsRendering from '../ContactsRendering/ContactsRendering';
import ContactsFilter from '../ContactsFilter/ContactsFilter';
import './ContactsList.css';
import initialContacts from '../../data/contactsList';

function setInitialContacts() {
  const savedContacts = JSON.parse(localStorage.getItem('contacts'));
  const initialValue = savedContacts ? savedContacts : initialContacts;
  return initialValue;
}

export default function ContactsList() {
  const [contacts, setContacts] = useState(() => setInitialContacts());

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }, [contacts, filter]);

  const addContact = (name, number) => {
    const contact = {
      name,
      number,
      id: uuidv4(),
    };

    const isCreated = contacts.find(item => item.number === number);

    if (isCreated) return alert('Contact has already been created');

    setContacts(prevState => [...prevState, contact]);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  return (
    <>
      <div className="phonebook-container">
        <div className="login-box">
          <h2>PhoneBook</h2>
          <ContactsEditor onSubmit={addContact} />
        </div>
        <div className="phonebook-box">
          <ContactsFilter value={filter} onChange={changeFilter} />
          <ContactsRendering
            filterList={filteredContacts}
            deleteContact={deleteContact}
          />
        </div>
      </div>
    </>
  );
}

ContactsList.propTypes = {
  filter: PropTypes.string,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
