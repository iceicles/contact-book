import Model from './model.js';
import View from './view.js';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // bind view to model
    this.view.bindAddContact(this.handleAddContact.bind(this));
    this.view.bindUpdateContact(this.handleUpdateContact.bind(this));

    // initial render
    this.updateView();
  }

  updateView() {
    // update view with newly added contact
    this.view.render(this.model.getContacts(), this.model.id);

    // update view with 'delete all contacts' button
    this.view.bindDeleteContacts(this.handleDeleteContacts.bind(this));
    // this.view.render(this.model.getRecentlyAddedContact());
  }

  handleUpdateContact(contactId, key, value) {
    console.log(
      `Controller handling update: contact ${contactId}, field ${key} to "${value}"`
    );
    this.model.updateContact(contactId, key, value);
    // no need to call updateView() here - we don't need to refresh the entire table
    // the change is already visible in the DOM because the user edited it directly
  }

  handleAddContact(contacts) {
    this.model.addContact(contacts);
    this.updateView();
  }

  handleDeleteContacts() {
    this.model.deleteContacts();
  }
}

new Controller(new Model(), new View());
