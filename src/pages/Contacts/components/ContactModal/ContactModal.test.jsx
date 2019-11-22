import React from 'react';
import { shallow } from 'enzyme';
import ContactModal from './index';

const contactDetail = {
  picture: {
    large: 'largepicture',
  },
  name: {
    first: 'first name',
    last: 'last name',
  },
  location: {
    street: {
      number: 302,
      name: 'some street',
    },
    city: 'ahmedabad',
    state: 'gujarat',
    postcode: 455634,
  },
  login: {
    username: 'utsav',
  },
  email: 'anony@anony.com',
  phone: '876543456',
};

describe('ContactModal component', () => {
  it('renders without crashing', () => {
    shallow(<ContactModal contactDetail={contactDetail} onCloseModal={() => {}} />);
  });
});
