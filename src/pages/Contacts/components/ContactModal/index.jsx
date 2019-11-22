/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactModal.module.scss';

const propTypes = {
  contactDetail: PropTypes.shape({
    picture: PropTypes.shape({
      large: PropTypes.string,
    }),
    name: PropTypes.shape({
      first: PropTypes.string,
      last: PropTypes.string,
    }),
    location: PropTypes.shape({
      street: PropTypes.shape({
        number: PropTypes.number,
        name: PropTypes.string,
      }),
      city: PropTypes.string,
      state: PropTypes.string,
      postcode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    login: PropTypes.shape({
      username: PropTypes.string,
    }),
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
  onCloseModal: PropTypes.func.isRequired,
  modalOffset: PropTypes.shape({}),
};

const defaultProps = {
  modalOffset: {
    top: '50%',
    bottom: '50%',
  },
};

const ContactModal = ({ contactDetail, onCloseModal, modalOffset }) => (
  <div className={s.root} style={modalOffset} id="not_close_modal">
    <div className={s.contentContainer}>
      <button type="button" className={s.close} onClick={onCloseModal}>
        &times;
      </button>
      <div className={s.detailsContainer}>
        <img
          className={s.thumbnail}
          src={contactDetail.picture.large}
          alt={contactDetail.name.first}
        />
        <div className={s.infoContainer}>
          <h1>
            <span className={s.lastName}>{contactDetail.name.last}</span>
            {`, `}
            <span className={s.firstName}>{contactDetail.name.first}</span>
          </h1>
          <table>
            <tbody>
              <tr>
                <td>e-mail</td>
                <td>{contactDetail.email}</td>
              </tr>
              <tr>
                <td>phone</td>
                <td>{contactDetail.phone}</td>
              </tr>
              <tr>
                <td>street</td>
                <td>{`${contactDetail.location.street.number} ${contactDetail.location.street.name}`}</td>
              </tr>
              <tr>
                <td>city</td>
                <td>{contactDetail.location.city}</td>
              </tr>
              <tr>
                <td>state</td>
                <td>{contactDetail.location.state}</td>
              </tr>
              <tr>
                <td>postcode</td>
                <td>{contactDetail.location.postcode}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={s.username}>{`USERNAME ${contactDetail.login.username}`}</div>
    </div>
  </div>
);

ContactModal.propTypes = propTypes;
ContactModal.defaultProps = defaultProps;
export default ContactModal;
