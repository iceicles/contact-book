import LocalStorage from '../helper/localStorage.js';
import { dataModel } from '../interface/interfaces.js';

class Model {
  constructor() {
    this.contacts = JSON.parse(localStorage.getItem(dataModel.CONTACT)) || [];
    this.id =
      this.getContactsLength() > 0
        ? Math.max(...this.contacts.map((c) => c.id))
        : 0;
  }

  incrementId() {
    return ++this.id;
  }

  getContacts() {
    // sort contacts by date in descending order (most recent first)
    const sortedContacts = [...this.contacts].sort((a, b) => {
      return b.date - a.date;
    });

    return sortedContacts;
  }

  addContact(data) {
    const newContact = {
      id: this.incrementId(),
      ...data,
      date: new Date(),
    };
    this.contacts.unshift(newContact);
    this.saveContacts();
  }

  deleteContacts() {
    this.contacts = [];
    LocalStorage.clear();
  }

  deleteContact(contactId) {
    // find the contact in the array
    const contactIndex = this.contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactIndex !== -1) {
      this.contacts = this.contacts.filter(
        (contact) => contact.id !== contactId
      );
      this.saveContacts();
      return this.contacts;
    }
  }

  updateContact(contactId, key, value) {
    // find the contact in the array
    const contactIndex = this.contacts.findIndex(
      (contact) => contact.id === contactId
    );

    // contactIndex must be present in contacts data
    if (contactIndex !== -1) {
      // update the specific field
      this.contacts[contactIndex][key] = value;

      // save to localStorage
      this.saveContacts();
      return true;
    }

    console.log(`Contact with ID ${contactId} not found`);
    return false;
  }

  // save contacts to localStorage
  saveContacts() {
    LocalStorage.setItem(dataModel.CONTACT, this.contacts);
  }

  getContactsLength() {
    return this.contacts.length;
  }

  resetContactId() {
    return (this.id = 0);
  }

  //[not in use]
  getContactById() {
    return this.getContacts().filter((contact) => contact.id === this.id);
  }

  //[not in use]
  getRecentlyAddedContact() {
    return this.getContacts()[this.getContacts().length - 1] || [];
  }
}

export default Model;
