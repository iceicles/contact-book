import LocalStorage from './localStorage.js';
import { dataModel } from './interfaces.js';

class Model {
  id = 0;
  constructor() {
    this.contacts = [];
  }

  incrementId() {
    return ++this.id;
  }

  getContacts() {
    console.log('[model] contacts - ', this.contacts);
    return JSON.parse(localStorage.getItem(dataModel.CONTACT)) || [];
  }

  addContact(data) {
    this.contacts.push({
      id: this.incrementId(),
      ...data,
      date: new Date(),
    });
    LocalStorage.setItem(dataModel.CONTACT, this.contacts);
  }

  deleteContacts() {
    LocalStorage.clear();
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
