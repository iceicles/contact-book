import getMainEl from './mainTag.js';

class TableView {
  constructor() {
    this.tableInitialized = false;
  }

  initializeTable() {
    if (!this.tableInitialized) {
      this.createTable();
      this.createTableHead();
      this.createTableBody();
      this.tableInitialized = true;
    }
  }

  createTable() {
    this.table = document.createElement('table');
    getMainEl.appendChild(this.table); //<main><table></table></main>
  }

  createTableBody() {
    this.tableBody = this.table.createTBody(); // <tbody>
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
    return row.insertCell(); // <tr><td></td></tr>
  }

  setTableDataContent(cell, key, value) {
    cell.setAttribute('contenteditable', 'true');
    if (key === 'date') cell.removeAttribute('contenteditable');
    cell.textContent = value || ''; // <td>{value}</td>
  }

  setTableHeadContent(key) {
    // check if headers exist
    let existingHeaders = Array.from(this.tableHeaderRow.children).map(
      (th) => th.textContent
    );

    // get the display name for this key
    let headerName = this.getHeaderNameForKey(key);

    if (!existingHeaders.includes(headerName)) {
      let tableHeaderContent = this.createTableHeadItemElement(); // <th />
      tableHeaderContent.textContent = headerName;
      this.tableHeaderRow.append(tableHeaderContent); // <tr><th></th></tr>
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

    // add table headers if needed and create cells for each property
    for (let key in contact) {
      if (key === 'id') continue;

      // ensures we have a header for this property
      this.setTableHeadContent(key);

      const cell = this.createTableDataCell(newRow);
      this.setTableDataContent(cell, key, contact[key]);
    }
  }

  // add a contact to the table - can be called with either a single contact or an ID
  addContact(contacts, contactId) {
    return this.addContactRow(contacts[contactId - 1]);
  }

  // can be used to add a batch of contacts
  addContacts(contacts) {
    this.initializeTable();

    // add each contact
    return contacts.map((contact) => this.addContactRow(contact));
  }
}

export default new TableView();
