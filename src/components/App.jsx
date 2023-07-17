import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { ContactFilter } from './ContactFilter/ContactFilter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleCreateContact = ({ name, number }) => {
    const doesAlreadyExist = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (doesAlreadyExist) {
      return alert(`${name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [
          ...prevState.contacts,
          { name: name, number: number, id: nanoid() },
        ],
      }));
    }
  };
  handleDeleteContact = id => {
    const updatedContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({ contacts: updatedContacts });
  };

  handleContactsDisplay = () => {
    const normalizedFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    return (
      <div style={{ marginLeft: '10px' }}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleCreateContact} />
        <h2>Contacts</h2>
        <ContactFilter
          filter={this.state.filter}
          handleChange={this.handleChange}
        />
        <ContactList
          contacts={this.handleContactsDisplay()}
          onContactDelete={this.handleDeleteContact}
        />
      </div>
    );
  }
}
