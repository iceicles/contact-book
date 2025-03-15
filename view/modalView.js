import ButtonView from './buttonView.js';
import getMainEl from '../mainTag.js';
import Observable from '../helper/observable.js';
import TableView from './tableView.js';

class ModalView {
  constructor() {
    this.modalContainer = document.createElement('div');
    this.modalContent = document.createElement('div');
    this.modalContentMsg = document.createElement('p');
    this.modalBtnsContainer = document.createElement('div');
    this.modalContactName = document.createElement('span');
    this.yesBtn = ButtonView.getModalYesBtn();
    this.noBtn = ButtonView.getModalNoBtn();
    this.delAllYesBtn = ButtonView.getModalYesDeleteAllBtn();
    this.delAllNoBtn = ButtonView.getModalNoDeleteAllBtn();

    // event listener to close modal when clicking outside
    this.modalContainer.addEventListener('click', (e) => {
      let insideModal = this.modalContent.contains(e.target);
      if (!insideModal) {
        this.closeModal();
      }
    });

    // event listener to close modal when Escape key is pressed
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  render(msg, handler, contactId, delBtnEl) {
    this.modalContainer.classList.add('modal-container');
    this.modalContent.classList.add('modal-content');
    this.modalBtnsContainer.classList.add('modal-btns-container');
    this.modalContentMsg.innerHTML = msg;
    this.modalContent.append(this.modalContentMsg, this.modalBtnsContainer);
    this.modalContainer.append(this.modalContent);
    this.modalContainer.style.display = 'flex';

    getMainEl.append(this.modalContainer);

    // clear the button container before appending any new buttons
    this.modalBtnsContainer.innerHTML = '';

    if (!!contactId) {
      this.modalBtnsContainer.append(this.yesBtn, this.noBtn);
      this.handleDeleteSingleContact(contactId, delBtnEl);
    } else {
      this.modalBtnsContainer.append(this.delAllYesBtn, this.delAllNoBtn);
      this.handleDeleteAllContacts(handler);
    }
  }

  closeModal() {
    // deep clone the buttons (i.e., incl children) to reset them and remove previously registered event handlers
    this.yesBtn = this.yesBtn.cloneNode(true);
    this.noBtn = this.noBtn.cloneNode(true);
    this.delAllYesBtn = this.delAllYesBtn.cloneNode(true);
    this.delAllNoBtn = this.delAllNoBtn.cloneNode(true);

    // remove the modal from the DOM
    this.modalContainer.remove();
  }

  deleteSingleContact(id, delBtnEl) {
    Observable.notify(id);
    TableView.removeContactFromDOM(delBtnEl);
    this.closeModal();
  }

  // delete single contact
  handleDeleteSingleContact(id, delBtnEl) {
    this.yesBtn.addEventListener('click', () =>
      this.deleteSingleContact(id, delBtnEl)
    );
    this.noBtn.addEventListener('click', () => {
      this.closeModal();
    });
  }

  deleteAllContacts(handler) {
    handler();
    location.reload();
  }

  // delete all contacts
  handleDeleteAllContacts(handler) {
    this.delAllYesBtn.addEventListener('click', () =>
      this.deleteAllContacts(handler)
    );
    this.delAllNoBtn.addEventListener('click', () => {
      this.closeModal();
    });
  }
}

export default new ModalView();
