import LocalStorage from './localStorage.js';
import { dataModel } from './interfaces.js';

class Model {
  constructor() {
    this.contacts = JSON.parse(localStorage.getItem(dataModel.CONTACT)) || [];
    this.id =
      this.contacts.length > 0
        ? Math.max(...this.contacts.map((c) => c.id))
        : 0;
  }

  incrementId() {
    return ++this.id;
  }

  getContacts() {
    console.log('[model] contacts - ', this.contacts);
    return this.contacts;
  }

  addContact(data) {
    const newContact = {
      id: this.incrementId(),
      ...data,
      date: new Date().toISOString(),
    };
    this.contacts.push(newContact);
    this.saveContacts();
  }

  deleteContacts() {
    this.contacts = [];
    LocalStorage.clear();
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
      console.log(`Updated contact ${contactId}: ${key} = ${value}`);

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
