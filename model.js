const data = {
  firstName: 'john',
  lastName: 'doe',
  phoneNumber: '409-430-4029',
  email: 'jondoe@mail.com',
};

const data2 = {
  firstName: 'jane',
  lastName: 'doe',
  phoneNumber: '509-430-4029',
  email: 'janedoe@mail.com',
};

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
    let contactId = this.incrementId();
    this.contacts.push({
      id: contactId,
      ...data,
      date: new Date(),
    });
  }
}

export default Model;
