import css from './ContactFilter.module.css';
import PropTypes from 'prop-types';

export const ContactFilter = ({ filter, handleChange }) => (
  <div className={css.filter}>
    <label htmlFor="filter" className={css.filter__label}>
      Find contacts by name
    </label>
    <input
      className={css.filter__input}
      type="text"
      name="filter"
      id="filter"
      value={filter}
      onChange={handleChange}
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    ></input>
  </div>
);

ContactFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
