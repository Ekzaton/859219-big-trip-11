// Модели
import TripEventsItemModel from "../models/trip-events-item.js";

// Библиотеки
import {nanoid} from "nanoid";

// Проверка доступности интернета
const checkOnline = () => {
  return window.navigator.onLine;
};

// Получение синхронизированных точек маршрута
const getSyncedEvents = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.point);
};

// Создание структуры хранилища
const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

// Класс
export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getEvents() {
    if (checkOnline()) {
      return this._api.getEvents()
        .then((events) => {
          const items = createStoreStructure(events.map((eventsItem) => eventsItem.toRAW()));

          this._store.setItems(items);

          return events;
        });
    }
    const localEvents = Object.values(this._store.getItems());

    return Promise.resolve(TripEventsItemModel.parseEvents(localEvents));
  }

  getEventDestinations() {
    if (checkOnline()) {
      return this._api.getEventDestinations()
      .then((eventDestinations) => {
        this._store.setItemDestinations(eventDestinations);

        return eventDestinations;
      });
    }
    const localEventDestinations = this._store.getItemDestinations();

    return Promise.resolve(localEventDestinations);
  }

  getEventOffers() {
    if (checkOnline()) {
      return this._api.getEventOffers()
        .then((eventOffers) => {
          this._store.setItemOffers(eventOffers);

          return eventOffers;
        });
    }
    const localEventOffers = this._store.getItemOffers();

    return Promise.resolve(localEventOffers);
  }

  updateEventsItem(id, data) {
    if (checkOnline()) {
      return this._api.updateEventsItem(id, data)
        .then((updatedEventsItem) => {
          this._store.setItem(updatedEventsItem.id, updatedEventsItem.toRAW());

          return updatedEventsItem;
        });
    }
    const localEventsItem = TripEventsItemModel.clone(Object.assign(data, {id}));

    this._store.setItem(id, localEventsItem.toRAW());

    return Promise.resolve(localEventsItem);
  }

  addEventsItem(eventsItem) {
    if (checkOnline()) {
      return this._api.addEventsItem(eventsItem)
        .then((newEventsItem) => {
          this._store.setItem(newEventsItem.id, newEventsItem.toRAW());

          return newEventsItem;
        });
    }
    const localNewEventsItemId = nanoid();
    const localNewEventsItem = TripEventsItemModel
      .clone(Object.assign(eventsItem, {id: localNewEventsItemId}));

    this._store.setItem(localNewEventsItem.id, localNewEventsItem.toRAW());

    return Promise.resolve(localNewEventsItem);
  }

  removeEventsItem(id) {
    if (checkOnline()) {
      return this._api.removeEventsItem(id)
        .then(() => this._store.removeItem(id));
    }
    this._store.removeItem(id);

    return Promise.resolve();
  }

  sync() {
    if (checkOnline()) {
      const localEvents = Object.values(this._store.getItems());
      return this._api.sync(localEvents)
        .then((response) => {
          const addedEvents = getSyncedEvents(response.created);
          const updatedEvents = getSyncedEvents(response.updated);
          const items = createStoreStructure([...addedEvents, ...updatedEvents]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}
