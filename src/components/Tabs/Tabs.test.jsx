import React from 'react';
import { shallow, mount } from 'enzyme';
import Tabs from './index';
import mockContactData from '../../../__mocks__/contacts';
import { contactsGroupByAlphabet } from '../../utils';

describe('Tabs component', () => {
  it('renders without crashing', () => {
    shallow(<Tabs tabs={['a', 'b', 'c']} activeTab="b" contactsByAlphabets={{}} />);
  });

  it('should have activetab text equal to b', () => {
    const wrapper = mount(<Tabs tabs={['a', 'b', 'c']} activeTab="b" contactsByAlphabets={{}} />);
    expect(
      wrapper
        .find('.active')
        .find('span')
        .first()
        .text(),
    ).toBe('b');
  });

  it('should have display exact count of alphabet`s contacts', () => {
    const contactsByAlphabets = contactsGroupByAlphabet(mockContactData.results);
    const wrapper = mount(
      <Tabs tabs={['a', 'b', 'c']} activeTab="b" contactsByAlphabets={contactsByAlphabets} />,
    );
    expect(
      wrapper
        .find('button')
        .first()
        .find('.count')
        .text(),
    ).toBe('2');
  });

  it('should return tab data onclick of tab', () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <Tabs tabs={['a', 'b', 'c']} activeTab="b" contactsByAlphabets={{}} onClick={mockFn} />,
    );

    wrapper
      .find('button')
      .first()
      .props()
      .onClick();

    expect(mockFn).toHaveBeenCalledWith('a');
  });
});
