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
    this.view.render(this.model.getContacts(), this.model.id);
    // this.view.render(this.model.getRecentlyAddedContact());
  }

  handleAddContact(contacts) {
    this.model.addContact(contacts);
    this.updateView();
  }
}

const app = new Controller(new Model(), new View());

document.addEventListener('DOMContentLoaded', app);
