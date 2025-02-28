class View {
  // initial view on screen
  constructor() {
    this.main = document.querySelector('main');
    this.firstName = document.querySelector('#fName');
    this.lastName = document.querySelector('#lName');
    this.phoneNumber = document.querySelector('#phone-number');
    this.email = document.querySelector('#email');
    this.submitBtn = document.querySelector('#submit-btn');
  }

  // what gets rendered when a new contact is added
  render(contacts) {
    if (Object.values(contacts).length <= 0) {
      this.main.innerHTML = '<p>Nothing for now...</p>';
      return;
    } else {
      this.main.innerHTML = '';
      this.table = document.createElement('table');
      this.tableHeaderRow = document.createElement('tr');
      this.main.appendChild(this.table);
      this.tableHead = this.table.createTHead();
      this.tableHead.appendChild(this.tableHeaderRow);
    }

    const tableHeaderData = [];
    const tableBodyData = [];

    contacts.forEach((contact) => {
      for (let key in contact) {
        // add the key if it exists in contacts, and tableHeaderData doesn't already have it
        if (contact[key] !== '') {
          if (key !== 'id' && key !== 'date') {
            if (contact.hasOwnProperty(key) && !tableHeaderData.includes(key)) {
              tableHeaderData.push(key);
            }
          }
        }
      }
    });

    contacts.forEach((contact) => {
      for (let key in contact) {
        if (contact[key] != '' && key !== 'id') {
          tableBodyData.push(contact[key]);
        }
      }

      console.log('tableBodyData - ', tableBodyData);
    });

    tableHeaderData.forEach((header) => {
      this.tableHeader = document.createElement('th');
      switch (header) {
        case 'firstName':
          !!header ? (this.tableHeader.textContent = 'First Name') : '';
          break;
        case 'lastName':
          this.tableHeader.textContent = 'Last Name';
          break;
        case 'phoneNumber':
          this.tableHeader.textContent = 'Phone Number';
          break;
        case 'email':
          this.tableHeader.textContent = 'Email';
          break;
      }
      this.tableHeaderRow.append(this.tableHeader);
    });
    this.tableHeader = document.createElement('th');
    this.tableHeader.textContent = 'Date';
    this.tableHeaderRow.append(this.tableHeader);

    this.tableBody = this.table.createTBody();
    this.tableBodyRow = document.createElement('tr');
    this.tableBody.append(this.tableBodyRow);
    tableBodyData.forEach((item) => {
      this.tableData = document.createElement('td');
      this.tableData.textContent = item;
      this.tableBodyRow.append(this.tableData);
    });
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
