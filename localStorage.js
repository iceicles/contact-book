class LocalStorage {
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getItem(key) {
    return localStorage.getItem(key);
  }
  deleteItem(key) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
}

export default new LocalStorage();
