import css from './ContactList.module.css';
import PropTypes from 'prop-types';

export const ContactList = ({ contacts, onContactDelete }) => (
  <ul>
    {contacts.map(contact => (
      <li className={css.list__item} key={contact.id}>
        {contact.name}: {contact.number}
        <button
          className={css.deleteBtn}
          name="delete"
          onClick={() => onContactDelete(contact.id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onContactDelete: PropTypes.func.isRequired,
};
