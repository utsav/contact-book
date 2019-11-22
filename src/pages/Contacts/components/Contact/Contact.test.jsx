import React from 'react';
import { shallow } from 'enzyme';
import Contact from './index';

describe('Contact component', () => {
  it('renders without crashing', () => {
    shallow(<Contact firstName="firstName" lastName="lastName" index={1} />);
  });
});
