// Модели
import TripEventsItemModel from "../models/trip-events-item.js";

// Константы
import {Method} from "../const.js";

// Проверка статуса ответа
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

// Класс
export default class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getEvents() {
    return this._load({url: `points`})
      .then((response) => response.json())
      .then(TripEventsItemModel.parseEvents);
  }

  getEventDestinations() {
    return this._load({url: `destinations`})
      .then((response) => response.json());
  }

  getEventOffers() {
    return this._load({url: `offers`})
      .then((response) => response.json());
  }

  updateEventsItem(id, data) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(TripEventsItemModel.parseEventsItem);
  }

  addEventsItem(eventsItem) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(eventsItem.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(TripEventsItemModel.parseEventsItem);
  }

  removeEventsItem(id) {
    return this._load({
      url: `points/${id}`,
      method: Method.DELETE
    });
  }

  sync(data) {
    return this._load({
      url: `points/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json());
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
