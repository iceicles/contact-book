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
    this.noContactsMsg = document.createElement('p');
    this.tableInitialized = false;
  }

  // what gets rendered when a new contact is added
  render(contacts, contactId) {
    if (Object.values(contacts).length <= 0) {
      this.noContactsMsg.classList.add('empty-contacts-msg');
      this.noContactsMsg.textContent = 'Nothing for now...';
      getMainEl.appendChild(this.noContactsMsg);
      return;
    }

    // only clear and initialize table on first render
    if (!this.tableInitialized) {
      // remove empty msg node
      getMainEl.querySelector('p.empty-contacts-msg')?.remove();

      // add 'delete all contacts' btn
      this.deleteContactsBtn = document.createElement('button');
      this.deleteContactsBtn.classList.add('del-contacts');
      this.deleteContactsBtn.id = 'del-contacts';
      this.deleteContactsBtn.textContent = 'Delete All Contacts';
      getMainEl.append(this.deleteContactsBtn);

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

  // create new contact
  bindAddContact(handler) {
    this.submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.contactAvailable() > 0) {
        handler(this.getInputValues());
      }
      this.clearInputValues();
    });
  }

  // edit contact
  bindUpdateContact(handler) {
    // pass the handler to TableView so it can be called when cells are edited
    TableView.setUpdateContactCallback(handler);
  }

  // delete all contacts
  bindDeleteContacts(handler) {
    // only add listener if there's a table present
    if (this.tableInitialized) {
      this.deleteContactsBtn.addEventListener('click', () => {
        handler();
        location.reload(); // reloads current page
      });
    }
  }
}

export default View;
