// Класс
export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;
    this._destinationsKey = `destinations`;
    this._offersKey = `offers`;
  }

  getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey)) || {};
    } catch (err) {
      return {};
    }
  }

  getItemDestinations() {
    try {
      return JSON.parse(this._storage.getItem(this._destinationsKey)) || {};
    } catch (err) {
      return {};
    }
  }

  getItemOffers() {
    try {
      return JSON.parse(this._storage.getItem(this._offersKey)) || {};
    } catch (err) {
      return {};
    }
  }

  setItems(items) {
    this._storage.setItem(
        this._storeKey,
        JSON.stringify(items)
    );
  }

  setItem(key, value) {
    const store = this.getItems();

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(
            Object.assign({}, store, {
              [key]: value
            })
        )
    );
  }

  setItemDestinations(destinations) {
    this._storage.setItem(this._destinationsKey, JSON.stringify(destinations));
  }

  setItemOffers(offers) {
    this._storage.setItem(this._offersKey, JSON.stringify(offers));
  }

  removeItem(key) {
    const store = this.getItems();

    delete store[key];

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(store)
    );
  }
}
