class ButtonView {
  constructor() {
    this.deleteAllContactsBtn = document.createElement('button');
    this.deleteContactBtn = null;
  }

  // button for deleting all contacts
  getDeleteAllContactsBtn() {
    this.deleteAllContactsBtn.classList.add('del-contacts');
    this.deleteAllContactsBtn.id = 'del-contacts';
    this.deleteAllContactsBtn.textContent = 'Delete All Contacts';
    return this.deleteAllContactsBtn;
  }

  // button for deleting a single contact
  getDeleteContactBtn() {
    this.deleteContactBtn = document.createElement('button');
    this.deleteContactBtn.textContent = 'Delete';
    this.deleteContactBtn.classList.add('del-contact');
    return this.deleteContactBtn;
  }
}

export default new ButtonView();
