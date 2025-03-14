import TableView from './tableView.js';
import getMainEl from '../mainTag.js';
import ButtonView from './buttonView.js';
import InitTable from '../initTable.js';
import ModalView from './modalView.js';

class View {
  // initial view on screen
  constructor() {
    this.firstName = document.querySelector('#fName');
    this.lastName = document.querySelector('#lName');
    this.phoneNumber = document.querySelector('#phone-number');
    this.email = document.querySelector('#email');
    this.submitBtn = document.querySelector('#submit-btn');
    this.noContactsMsg = document.createElement('p');
    this.searchInput = document.querySelector('#search');
    this.noSearchMsg = document.createElement('p');
    this.deleteAllContactsBtn = ButtonView.getDeleteAllContactsBtn();
    this.tableInitialized = InitTable.tableInitialized; // initially false
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
      getMainEl.append(this.deleteAllContactsBtn);

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
    this.deleteAllContactsBtn.addEventListener('click', () => {
      ModalView.render(
        'Are you sure you want to delete all contacts?',
        handler
      );
    });
  }

  // resets view when last contact deleted
  removeTableFromView() {
    TableView.removeTableElement();
    this.deleteAllContactsBtn.remove();
    location.reload(); // reloads page and renders 'no contact msg'
  }

  getSearchInput() {
    return this.searchInput.value.trim().toLowerCase();
  }

  // handle contacts search
  handleSearchContacts() {
    this.searchInput.addEventListener('input', () => {
      if (this.tableInitialized) {
        let tableBodyChildren = TableView.getTableBody().children; // [<tr></tr>] - nodelist
        let tableBodyArray = Array.from(tableBodyChildren); // [tr, tr, tr] - array
        let searchQuery = this.getSearchInput();

        // looping through all rows
        for (let tr of tableBodyChildren) {
          let rowMatches = false;

          // each <td> in the current row
          let tdElements = tr.querySelectorAll('td');
          for (let td of tdElements) {
            if (td.innerHTML.toLowerCase().includes(searchQuery)) {
              rowMatches = true; // at least one <td> matches, so the row is visible
              break; // leave loop, no need to check further <td> elements in this row
            }
          }

          if (rowMatches) {
            tr.style.display = '';
          } else {
            tr.style.display = 'none';
          }
        }

        // check if every row has a display of 'none'
        if (tableBodyArray.every((row) => row.style.display === 'none')) {
          this.noSearchMsg.classList.add('no-search-msg');
          this.noSearchMsg.innerHTML = 'No item matching search...';
          TableView.getTableBody().append(this.noSearchMsg);
          TableView.getTableHead().style.display = 'none';
          this.noSearchMsg.style.display = 'block';
        } else if (TableView.getTableBody().contains(this.noSearchMsg)) {
          TableView.getTableBody().removeChild(this.noSearchMsg);
          TableView.getTableHead().style.display = '';
        }
      }
    });
  }
}

export default View;
