import Model from './model.js';
import Observable from './observable.js';
import View from './view.js';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // bind view to model
    this.view.bindAddContact(this.handleAddContact.bind(this));
    this.view.bindUpdateContact(this.handleUpdateContact.bind(this));
    this.view.handleSearchContacts();

    // initial render
    this.updateView();

    // bind 'delete all contacts' button view to handler
    // this should get called after updateView because the button gets appended to DOM during render..
    // ..so before render, it doesn't exist
    this.view.bindDeleteContacts(this.handleDeleteContacts.bind(this));

    // calls observer with (any) passed data
    Observable.subscribe(this.handleDeleteContact.bind(this));
  }

  updateView() {
    // update view with newly added contact
    this.view.render(this.model.getContacts(), this.model.id);
  }

  handleUpdateContact(contactId, key, value) {
    this.model.updateContact(contactId, key, value);
    // no need to call updateView() here - we don't need to refresh the entire table
    // the change is already visible in the DOM because the user edited it directly
  }

  handleAddContact(contacts) {
    this.model.addContact(contacts);
    this.updateView();
  }

  // delete all contacts
  handleDeleteContacts() {
    this.model.deleteContacts();
  }

  // delete single contact
  handleDeleteContact(id) {
    this.model.deleteContact(id);
    // resets view and model id ONLY when last contact is deleted (i.e., contacts length === 0)
    if (!this.model.getContactsLength()) {
      this.view.removeTableFromView();
      this.model.resetContactId();
    }
  }
}

new Controller(new Model(), new View());
