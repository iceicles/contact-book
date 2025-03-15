class ButtonView {
  constructor() {
    this.deleteAllContactsBtn = document.createElement('button');
    this.deleteContactBtn = null;
    this.yesBtn = null;
    this.noBtn = null;
    this.delAllYesBtn = null;
    this.delAllNoBtn = null;
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

  getModalYesBtn() {
    this.yesBtn = document.createElement('button');
    this.yesBtn.classList.add('yes-btn');
    this.yesBtn.textContent = 'Yes';
    return this.yesBtn;
  }

  getModalNoBtn() {
    this.noBtn = document.createElement('button');
    this.noBtn.classList.add('no-btn');
    this.noBtn.textContent = 'No';
    return this.noBtn;
  }

  getModalYesDeleteAllBtn() {
    this.delAllYesBtn = document.createElement('button');
    this.delAllYesBtn.classList.add('yes-btn');
    this.delAllYesBtn.textContent = 'Yes, delete all';
    return this.delAllYesBtn;
  }

  getModalNoDeleteAllBtn() {
    this.delAllNoBtn = document.createElement('button');
    this.delAllNoBtn.classList.add('no-btn');
    this.delAllNoBtn.textContent = 'No, keep all';
    return this.delAllNoBtn;
  }
}

export default new ButtonView();
