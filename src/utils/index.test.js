import { contactsGroupByAlphabet } from './index';

const contactData = [
  {
    name: {
      first: 'one',
    },
  },
  {
    name: {
      first: 'two',
    },
  },
  {
    name: {
      first: 'three',
    },
  },
  {
    name: {
      first: 'four',
    },
  },
  {
    name: {
      first: 'five',
    },
  },
  {
    name: {
      first: 'six',
    },
  },
  {
    name: {
      first: 'Öffkm',
    },
  },
];

const outputData = {
  $: [{ name: { first: 'Öffkm' } }],
  f: [{ name: { first: 'four' } }, { name: { first: 'five' } }],
  o: [{ name: { first: 'one' } }],
  s: [{ name: { first: 'six' } }],
  t: [{ name: { first: 'two' } }, { name: { first: 'three' } }],
};

describe('Utils: contactsGroupByAlphabet', () => {
  test('it should return expected result', () => {
    expect(contactsGroupByAlphabet(contactData)).toStrictEqual(outputData);
  });
});
