class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter((observer) => observer != func);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }

  getObservers() {
    console.log(this.observers);
    return this.observers;
  }
}

export default new Observable();
