import { alphabets } from '../constants';

export const contactsGroupByAlphabet = (contacts) =>
  contacts.reduce((contactGroup, e) => {
    const firstLetter = e.name.first[0].toLowerCase();
    const alphabet = alphabets.includes(firstLetter) ? firstLetter : '$';
    // eslint-disable-next-line no-param-reassign
    if (!contactGroup[alphabet]) contactGroup[alphabet] = [e];
    else contactGroup[alphabet].push(e);
    return contactGroup;
  }, {});

export default { contactsGroupByAlphabet };
