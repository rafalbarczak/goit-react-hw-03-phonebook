import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { ContactFilter } from './ContactFilter/ContactFilter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storedData = localStorage.getItem('contacts');

    if (storedData) {
      this.setState({ contacts: JSON.parse(storedData) });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      if (this.state.contacts.length === 0) {
        localStorage.removeItem('contacts');
      }
    }
  }

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
