import { debounce } from './debounce.js';
import getMainEl from './mainTag.js';
import ButtonView from './buttonView.js';
import InitTable from './initTable.js';
import SVGView from './svgView.js';
import { DEBOUNCE_DELAY } from './constants.js';

class TableView {
  constructor() {
    this.tableInitialized = InitTable.tableInitialized; // initially false
    this.updateContactCallback = null;
    this.deleteContactCallback = null;
    // store a reference map of cells to their data
    // WeakMap used for performance reasons -  garbage collected
    this.cellMap = new WeakMap();
    this.isNewContactAdded = false;
  }

  initializeTable() {
    if (!this.tableInitialized) {
      this.createTable();
      this.createTableHead();
      this.createTableBody();
      this.tableInitialized = true;
      this.isNewContactAdded = false;
      this.lastHeadItemElCreated = false;
    }
  }

  createTable() {
    this.table = document.createElement('table');
    getMainEl.appendChild(this.table); //<main><table></table></main>
  }

  createTableBody() {
    this.tableBody = this.table.createTBody(); // <tbody>
  }

  getTableBody() {
    return this.tableBody;
  }

  getTableHead() {
    return this.tableHead;
  }

  createTableBodyRow() {
    this.tableBodyRow = this.tableBody.insertRow(); // <tr/> in <tbody><tr></tr></tbody>
    return this.tableBodyRow;
  }

  createTableHead() {
    this.tHeadEl = document.querySelector('thead');

    if (!this.tHeadEl) {
      this.tableHead = this.table.createTHead(); //<thead/>
      this.tableHeaderRow = document.createElement('tr');
      this.tableHead.appendChild(this.tableHeaderRow); // <thead><tr></tr></thead>
    }
  }

  createTableHeadItemElement() {
    return document.createElement('th');
  }

  createTableDataCell(row) {
    return row.insertCell(); // <td/> in <tr><td></td></tr>
  }

  setDeleteContactCallback(callback) {
    this.deleteContactCallback = callback;
  }

  removeTableElement() {
    this.table.remove();
  }

  createDeleteContactBtn(containerEl, id) {
    let delBtnEl = ButtonView.getDeleteContactBtn();
    containerEl.appendChild(delBtnEl);
    delBtnEl.addEventListener('click', () => {
      console.log(`[tableView] Deleting contact with id ${id}...`);
      let parentTableRow = delBtnEl.parentNode.parentNode;
      parentTableRow.remove();
      this.deleteContactCallback(id);
    });
    return delBtnEl;
  }

  toggleDeleteContactButton(containerEl, id) {
    // remove delete contact buton from the DOM
    if (containerEl.querySelector('button.del-contact')) {
      containerEl.removeChild(containerEl.querySelector('.del-contact'));
      return;
    }

    this.createDeleteContactBtn(containerEl, id);
  }

  createSettingsContainer(id) {
    let containerEl = document.createElement('div');
    let settingsEl = document.createElement('p');
    let settingsSVG = SVGView.getSettingsSVG();

    containerEl.classList.add('settings-container');
    settingsEl.classList.add('settings');
    settingsEl.append(settingsSVG);
    containerEl.append(settingsEl);

    settingsEl.addEventListener('click', () => {
      this.toggleDeleteContactButton(containerEl, id);
    });

    return containerEl;
  }

  setTableDataContent(cell, key, value, contact) {
    cell.setAttribute('contenteditable', 'true');

    // associate data with the cell
    this.cellMap.set(cell, {
      contactId: contact.id,
      key: key,
    });

    cell.dataset.title = key.charAt(0).toUpperCase() + key.slice(1);

    if (key === 'date') {
      cell.removeAttribute('contenteditable');
      cell.insertAdjacentElement(
        'afterend',
        this.createSettingsContainer(contact.id)
      );
      const date = new Date(value);
      cell.textContent = date.toLocaleDateString();
    } else {
      cell.textContent = value || '';

      // attach event listeners to listen to changes on each cell
      this.bindDataCellChanges(cell);
    }
  }

  setTableHeadContent(key) {
    // check if headers exist
    let existingHeaders = Array.from(this.tableHeaderRow.children).map(
      (th) => th.textContent
    );

    // get the display name for this key
    let headerName = this.getHeaderNameForKey(key);

    let tableHeaderContent;
    if (!existingHeaders.includes(headerName)) {
      tableHeaderContent = this.createTableHeadItemElement(); // <th />
      tableHeaderContent.textContent = headerName;
      this.tableHeaderRow.append(tableHeaderContent); // <tr><th></th></tr>
    }

    if (key === 'date' && !this.lastHeadItemElCreated) {
      let lastHeaderEl = document.createElement('th');
      lastHeaderEl.style.background =
        'linear-gradient(to right, var(--space-cadet-darkslateblue), var(--slate-deep) 10%, var(--space-cadet) 90%)';
      tableHeaderContent.insertAdjacentElement('afterend', lastHeaderEl);
      this.lastHeadItemElCreated = true;
    }
  }

  getHeaderNameForKey(key) {
    switch (key) {
      case 'firstName':
        return 'First Name';
      case 'lastName':
        return 'Last Name';
      case 'phoneNumber':
        return 'Phone Number';
      case 'email':
        return 'Email';
      case 'date':
        return 'Date';
      default:
        return key.charAt(0).toUpperCase() + key.slice(1);
    }
  }

  addContactRow(contact) {
    // init table
    this.initializeTable();

    // create a new row for this contact
    const newRow = this.createTableBodyRow();
    newRow.dataset.rowId = `row-${contact.id}`;

    // add table headers if needed and create cells for each property
    for (let key in contact) {
      if (key === 'id') continue;

      // ensures we have a header for this property
      this.setTableHeadContent(key);

      const cell = this.createTableDataCell(newRow);
      this.setTableDataContent(cell, key, contact[key], contact);

      // insert the new row at the top ONLY when a new contact is added (not on page load)
      if (this.isNewContactAdded) {
        this.tableBody.insertBefore(newRow, this.tableBody.firstChild);
      } else {
        this.tableBody.appendChild(newRow); // normal append during initial page load
      }
    }
  }

  // add a contact to the table - can be called with either a single contact or an ID
  addContact(contacts, contactId) {
    this.isNewContactAdded = true;

    if (contactId) {
      return this.addContactRow(contacts[0]);
    } else {
      // if no ID is provided, assume contacts is a single contact object
      return this.addContactRow(contacts);
    }
  }

  // can be used to add a batch of contacts
  addContacts(contacts) {
    this.isNewContactAdded = true;

    // add each contact
    return contacts.map((contact) => this.addContactRow(contact));
  }

  /* sets this.updateContactCallback from null (initially) to the controller's handler (callback).
   this happens during controller's construction
  */
  setUpdateContactCallback(callback) {
    this.updateContactCallback = callback;
  }

  // handle cell editing
  handleCellEdit(cell) {
    /* this check will almost never be true as updateContactCallback is set to handler in controller
     however, it is here for safety reasons
    */
    if (!this.updateContactCallback) return;

    // get the data from weakmap
    const cellData = this.cellMap.get(cell);

    // if data is not found, we don't edit
    if (!cellData) {
      console.error('Cell data not found in WeakMap!');
      return;
    }

    const { contactId, key } = cellData;
    const newValue = cell.textContent;
    console.log(`Updating contact ${contactId}, field ${key} to "${newValue}"`);

    // call the callback (the handler) from the controller and pass args
    this.updateContactCallback(contactId, key, newValue);
  }

  // bind events to editable cells
  bindDataCellChanges(cell) {
    // debounce to avoid excessive updates while typing
    const debouncedUpdate = debounce(
      () => this.handleCellEdit(cell),
      DEBOUNCE_DELAY
    );

    // listen for both input and 'Enter' key events
    cell.addEventListener('input', debouncedUpdate);
    cell.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // prevent adding a newline
        // remove focus to trigger the blur event - blur event not in use
        // cell.blur();
      }
    });
  }
}

/*
the import in view.js is called during module loading phase due type="module" (es modules)
this means, this file's constructor gets called first before model, view, then controller
*/
export default new TableView();
