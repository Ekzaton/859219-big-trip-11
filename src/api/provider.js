// Класс
export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getEvents() {
    return this._api.getEvents();
  }

  getEventDestinations() {
    return this._api.getEventDestinations();
  }

  getEventOffers() {
    return this._api.getEventOffers();
  }

  updateEventsItem(id, data) {
    return this._api.updateEventsItem(id, data);
  }

  addEventsItem(eventsItem) {
    return this._api.addEventsItem(eventsItem);
  }

  removeEventsItem(id) {
    return this._api.removeEventsItem(id);
  }
}
