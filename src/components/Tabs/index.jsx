import React from 'react';
import PropTypes from 'prop-types';
import s from './Tabs.module.scss';

const propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  activeTab: PropTypes.string,
  onClick: PropTypes.func,
  contactsByAlphabets: PropTypes.shape({}).isRequired,
};

const defaultProps = {
  activeTab: '',
  onClick: () => {},
};

const Tabs = ({ tabs, contactsByAlphabets, activeTab, onClick }) => (
  <div className={s.root}>
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => onClick(tab)}
        type="button"
        className={activeTab === tab ? s.active : ''}
      >
        <span>{tab}</span>
        <span className={s.count}>
          {contactsByAlphabets[tab] ? contactsByAlphabets[tab].length : 0}
        </span>
      </button>
    ))}
  </div>
);

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;
export default Tabs;
