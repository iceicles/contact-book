import TableView from './tableView.js';
import getMainEl from './mainTag.js';

class View {
  // initial view on screen
  constructor() {
    this.firstName = document.querySelector('#fName');
    this.lastName = document.querySelector('#lName');
    this.phoneNumber = document.querySelector('#phone-number');
    this.email = document.querySelector('#email');
    this.submitBtn = document.querySelector('#submit-btn');
    this.tableInitialized = false;
  }

  // what gets rendered when a new contact is added
  render(contacts, contactId) {
    if (Object.values(contacts).length <= 0) {
      getMainEl.innerHTML = '<p>Nothing for now...</p>';
      return;
    }

    // only clear and initialize table on first render
    if (!this.tableInitialized) {
      getMainEl.innerHTML = '';
      TableView.addContacts(Object.values(contacts));
      this.tableInitialized = true;
    } else if (contactId) {
      // add new subsequent contact without clearing anything
      TableView.addContact(contacts, contactId);
    }
  }

  getInputValues() {
    let inputValues = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      phoneNumber: this.phoneNumber.value,
      email: this.email.value,
    };
    return inputValues;
  }

  clearInputValues() {
    this.firstName.value = '';
    this.lastName.value = '';
    this.phoneNumber.value = '';
    this.email.value = '';
  }

  contactAvailable() {
    let contacts = this.getInputValues();
    let result = [];
    for (let key in contacts) {
      if (contacts[key] !== '') {
        result.push(contacts[key]);
      }
    }
    return result.length;
  }

  bindAddContact(handler) {
    this.submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.contactAvailable() > 0) {
        handler(this.getInputValues());
      }
      this.clearInputValues();
    });
  }
}

export default View;
