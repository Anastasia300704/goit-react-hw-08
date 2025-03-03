// redux/contacts/selectors.js
export const getContacts = state => state.contacts.items;
export const getContactsLoading = state => state.contacts.isLoading;
export const getContactsError = state => state.contacts.error;
