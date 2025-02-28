import Model from './model.js';
import View from './view.js';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // bind view to model
    this.view.bindAddContact(this.handleAddContact.bind(this));

    // initial render
    this.updateView();
  }

  updateView() {
    this.view.render(this.model.getContacts());
  }

  handleAddContact(contacts) {
    this.model.addContact(contacts);
    this.updateView();
  }
}

const app = new Controller(new Model(), new View());

document.addEventListener('DOMContentLoaded', app);
