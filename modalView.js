import getMainEl from './mainTag.js';

class ModalView {
  constructor() {
    this.modalContainer = document.createElement('div');
    this.modalContent = document.createElement('div');
    this.modalContentMsg = document.createElement('p');
    this.modalBtnsContainer = document.createElement('div');
    this.modalContactName = document.createElement('span');
    this.yesBtn = document.createElement('button');
    this.noBtn = document.createElement('button');
  }

  render(display, msg) {
    this.modalContainer.classList.add('modal-container');
    this.modalContent.classList.add('modal-content');
    this.modalBtnsContainer.classList.add('modal-btns-container');
    this.yesBtn.classList.add('yes-btn');
    this.noBtn.classList.add('no-btn');
    /* let msgNameArr = msg.split(' ');
    console.log(msgNameArr[msgNameArr.length - 1]); // 'may' for example
    let contactName = msgNameArr.pop()
    this.modalContactName.textContent = contactName
    this.modalContactName.classList.add('modal-contact-name') */

    this.modalContentMsg.innerHTML = msg; //'Are you sure you want to delete?';
    this.yesBtn.innerHTML = 'Yes';
    this.noBtn.innerHTML = 'No';
    this.modalBtnsContainer.append(this.yesBtn, this.noBtn);
    this.modalContent.append(this.modalContentMsg, this.modalBtnsContainer);
    this.modalContainer.append(this.modalContent);

    this.modalContainer.style.display = display;
    getMainEl.append(this.modalContainer);
    this.handleButtonClick();
  }

  handleButtonClick() {
    this.yesBtn.addEventListener('click', () => {
      console.log('yes btn clicked');
    });

    this.noBtn.addEventListener('click', () => {
      console.log('no btn clicked');
    });
  }
}

export default new ModalView();
