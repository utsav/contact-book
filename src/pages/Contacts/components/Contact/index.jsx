/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import PropTypes from 'prop-types';
import s from './Contact.module.scss';

const propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

const defaultProps = {
  onClick: () => {},
};

const Contact = ({ firstName, lastName, onClick, index }) => (
  <div
    id={`not_close_modal_contact_1_${index}`}
    role="button"
    tabIndex="0"
    className={s.root}
    onClick={onClick}
    onKeyPress={onClick}
  >
    <span id={`not_close_modal_contact_2_${index}`} className={s.firstName}>
      {firstName}
    </span>
    {', '}
    <span iid={`not_close_modal_contact_3_${index}`} className={s.lastName}>
      {lastName}
    </span>
  </div>
);

Contact.propTypes = propTypes;
Contact.defaultProps = defaultProps;
export default Contact;
