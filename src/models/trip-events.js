// Утилиты
import {getEventsByFilter} from "../utils/filter.js";

// Константы
import {FilterType} from "../const.js";

// Модель точек маршрута
export default class TripEvents {
  constructor() {
    this._events = [];
    this._activeFilterType = FilterType.EVERYTHING;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getEvents() {
    return getEventsByFilter(this._events, this._activeFilterType);
  }

  setEvents(events) {
    this._events = events;
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  resetFilter() {
    this._activeFilterType = FilterType.EVERYTHING;
    document.querySelector(`#filter-everything`).checked = true;
    this._callHandlers(this._filterChangeHandlers);
  }

  addEventsItem(eventsItem) {
    this._events = [].concat(eventsItem, this._events);
    this._callHandlers(this._dataChangeHandlers);
  }

  removeEventsItem(id) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index), this._events.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  updateEventsItem(id, eventsItem) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index), eventsItem, this._events.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
