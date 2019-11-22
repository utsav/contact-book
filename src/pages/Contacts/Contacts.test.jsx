import React from 'react';
import { shallow, mount } from 'enzyme';
import wait from 'waait';
import RouterDom from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Contacts from './index';
import mockContactData from '../../../__mocks__/contacts';

const mockFetchSuccessResponse = () =>
  Promise.resolve(
    new Response(JSON.stringify(mockContactData), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }),
  );

const mockFetchFailureResponse = () =>
  Promise.reject(
    new Response(JSON.stringify({ msg: 'something went wrong' }), {
      status: 403,
      headers: { 'content-type': 'application/json' },
    }),
  );

const mockFn = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockFn,
  }),
  useParams: () => ({
    alphabet: 'a',
  }),
}));

describe('Contacts component', () => {
  it('renders without crashing', () => {
    shallow(<Contacts />);
  });

  it('should show loader when api fecthing data', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<Contacts />);
      await wait(0);
    });
    expect(wrapper.find('Loader').exists()).toBe(true);
  });

  it('should display error when API is not working', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetchFailureResponse);
    let wrapper;
    await act(async () => {
      wrapper = mount(<Contacts />);
    });
    await wait(0);
    wrapper.update();
    expect(wrapper.text()).toBe('something went wrong');
  });

  it('should render page correct when proper data is loaded', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetchSuccessResponse);
    let wrapper;
    await act(async () => {
      wrapper = mount(<Contacts />);
    });
    await wait(0);
    wrapper.update();
    // eslint-disable-next-line max-len
    // it's length to be 2 because current page is alphabet A and we have only two records which have first name start with A alhpabet
    expect(wrapper.find('Contact').length).toBe(2);
  });

  it('should display modal when click on contact and close modal on close button click and on contact click', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetchSuccessResponse);
    let wrapper;
    await act(async () => {
      wrapper = mount(<Contacts />);
    });
    await wait(0);
    wrapper.update();
    const e = {
      target: {
        offsetTop: 20,
        offsetLeft: 20,
      },
    };

    // show modal
    await act(async () => {
      wrapper
        .find('Contact')
        .first()
        .props()
        .onClick(e);

      await wait(0);
    });
    wrapper.update();

    expect(wrapper.find('ContactModal').exists()).toBe(true);
    expect(wrapper.find('ContactModal').props().contactDetail).toStrictEqual(
      mockContactData.results[0],
    );

    // hide modal when click on same contact
    await act(async () => {
      wrapper
        .find('Contact')
        .first()
        .props()
        .onClick(e);
    });

    wrapper.update();
    expect(wrapper.find('ContactModal').exists()).toBe(false);

    // show modal
    await act(async () => {
      wrapper
        .find('Contact')
        .first()
        .props()
        .onClick(e);
    });

    await wait(0);
    wrapper.update();

    // hide modal when click on close button on modal
    await act(async () => {
      wrapper
        .find('ContactModal')
        .props()
        .onCloseModal();
    });

    wrapper.update();

    expect(wrapper.find('ContactModal').exists()).toBe(false);
  });

  it('should redirect to /contact/c page when click on tab', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetchSuccessResponse);
    let wrapper;
    await act(async () => {
      wrapper = mount(<Contacts />);
    });
    await wait(0);
    wrapper.update();

    wrapper
      .find('Tabs')
      .props()
      .onClick('c');

    expect(mockFn).toHaveBeenCalledWith('/contacts/c');
  });

  it('should render "no data" if not data found for alphabet', async () => {
    jest.spyOn(RouterDom, 'useParams').mockImplementation(() => ({
      alphabet: 'x',
    }));
    let wrapper;
    await act(async () => {
      wrapper = mount(<Contacts />);
    });
    await wait(0);
    wrapper.update();
    expect(
      wrapper
        .find('.tabContent')
        .children()
        .text(),
    ).toBe('no data');
  });
});
