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
      this.main.appendChild(this.table);
    }

    this.tableBody = this.table.createTBody(); // <tbody>

    // todo, loop through only the latest added contact and append to existing contacts
    contacts.forEach((contact) => {
      this.tableBodyRow = this.tableBody.insertRow();
      let value;
      const tHead = document.querySelector('thead');
      if (!tHead) {
        this.tableHead = this.table.createTHead(); //<thead/>
        this.tableHeaderRow = document.createElement('tr');
        this.tableHead.appendChild(this.tableHeaderRow); // <thead><tr></tr></thead>
      } else {
        this.tableHead = '';
      }
      for (let key in contact) {
        if (key === 'id') continue;
        value = contact[key];
        if (!!this.tableHead) {
          this.tableHeaderContent = document.createElement('th'); // <th/>
          switch (key) {
            case 'firstName':
              this.tableHeaderContent.textContent = 'First Name';
              break;
            case 'lastName':
              this.tableHeaderContent.textContent = 'Last Name';
              break;
            case 'phoneNumber':
              this.tableHeaderContent.textContent = 'Phone Number';
              break;
            case 'email':
              this.tableHeaderContent.textContent = 'Email';
              break;
            case 'date':
              this.tableHeaderContent.textContent = 'Date';
              break;
          }
        }
        this.tableHeaderRow.append(this.tableHeaderContent); // <tr><th></th></tr>
        let newCell = this.tableBodyRow.insertCell(); // <tr><td>{value}</td></tr>
        newCell.setAttribute('contenteditable', 'true');
        if (key === 'date') newCell.removeAttribute('contenteditable');
        newCell.textContent = value || '';
      }
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
