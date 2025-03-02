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
    return this.contacts;
  }

  addContact(data) {
    this.contacts.push({
      id: this.incrementId(),
      ...data,
      date: new Date(),
    });
  }

  getContactById() {
    return this.getContacts().filter((contact) => contact.id === this.id);
  }

  //[not in use]
  getRecentlyAddedContact() {
    return this.getContacts()[this.getContacts().length - 1] || [];
  }
}

export default Model;
