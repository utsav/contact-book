import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import s from './Contacts.module.scss';
import useFetch from '../../hooks/useFetch';
import Loader from '../../components/Loader';
import { contactsGroupByAlphabet } from '../../utils';
import { alphabets } from '../../constants';
import Tabs from '../../components/Tabs';
import Contact from './components/Contact';
import ContactModal from './components/ContactModal';

const API_URL = 'https://randomuser.me/api';
const DATA_COUNT = 100;

const Contacts = () => {
  const { data, loading, errors } = useFetch(`${API_URL}?results=${DATA_COUNT}`);
  const { alphabet: activeTab } = useParams();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [modalOffset, setModalOffset] = useState({ top: '50%', left: '50%' });
  const [contactDetail, setContactDetail] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setContactDetail(null);
  };

  /* istanbul ignore next */
  useEffect(() => {
    const handleWindowClick = (node) => {
      if (
        !node.target.id.includes('not_close_modal') &&
        node.target.closest('#not_close_modal') === null
      ) {
        handleCloseModal();
      }
    };
    document.addEventListener('click', handleWindowClick);
    return () => {
      document.removeEventListener('click', handleWindowClick);
    };
  }, []);

  const handleTabClick = (tab) => {
    history.push(`/contacts/${tab}`);
  };

  const handleContactClick = (e, contact) => {
    if (contactDetail && contactDetail.login.username === contact.login.username) {
      handleCloseModal();
      return;
    }
    setShowModal(false);
    setModalOffset({
      top: e.target.offsetTop + 20,
      left: e.target.offsetLeft + 10,
    });
    setTimeout(() => {
      setContactDetail(contact);
      setShowModal(true);
    }, 0);
  };

  if (loading) return <Loader />;
  if (errors) return 'something went wrong';

  const contactsByAlphabets = contactsGroupByAlphabet(data.results);
  const contacts = contactsByAlphabets[activeTab];
  return (
    <div className={s.root}>
      <Tabs
        tabs={alphabets}
        contactsByAlphabets={contactsByAlphabets}
        activeTab={activeTab}
        onClick={handleTabClick}
      />
      <div className={s.tabContent}>
        {contacts &&
          contacts.map((contact, i) => (
            <Contact
              key={contact.login.username}
              firstName={contact.name.first}
              lastName={contact.name.last}
              index={i}
              onClick={(e) => handleContactClick(e, contact)}
            />
          ))}
        {!contacts && <span>no data</span>}
      </div>
      {showModal && (
        <ContactModal
          isOpen={showModal}
          onCloseModal={handleCloseModal}
          contactDetail={contactDetail}
          modalOffset={modalOffset}
        />
      )}
    </div>
  );
};

export default Contacts;
