// Компоненты
import TripSortComponent from "../components/trip-sort.js";
import TripDaysComponent from "../components/trip-days.js";
import TripDaysItemComponent from "../components/trip-days-item.js";
import TripEventsMsgComponent from "../components/trip-events-msg.js";

// Контроллеры
import TripEventsItemController from "./trip-events-item.js";

// Утилиты
import {render, RenderPosition} from "../utils/render.js";

// Константы
import {Mode, EmptyEvent} from "./trip-events-item.js";
import {SortType} from "../const.js";

// Отрисовка точек маршрута
const renderTripEvents = (container, events, onDataChange, onViewChange) => {
  return events.map((eventsItem) => {
    const tripEventsItemController = new TripEventsItemController(container, onDataChange, onViewChange);

    tripEventsItemController.render(eventsItem);

    return tripEventsItemController;
  });
};

// Отрисовка дня маршрута
const renderTripDaysItem = (container, events, onDataChange, onViewChange, date, index) => {
  const tripDaysItemComponent = new TripDaysItemComponent(date, index);

  const tripEventsListElement = tripDaysItemComponent.getElement()
    .querySelector(`.trip-events__list`);

  const tripEventsItemControllers = renderTripEvents(tripEventsListElement, events, onDataChange, onViewChange);

  render(container, tripDaysItemComponent, RenderPosition.BEFOREEND);

  return tripEventsItemControllers;
};

// Отрисовка списка дней
const renderTripDays = (container, events, dates, onDataChange, onViewChange) => {
  let tripEventsItemControllers = [];

  dates.forEach((date, index) => {
    const eventsForDate = getEventsForDate(events, date);

    tripEventsItemControllers = tripEventsItemControllers
      .concat(renderTripDaysItem(container, eventsForDate, onDataChange, onViewChange, date, index));
  });

  return tripEventsItemControllers;
};

// Получение отсортированных точек маршрута
const getSortedEvents = (events, sortType) => {
  let sortedEvents = [];
  const newEvents = events.slice();

  switch (sortType) {
    case SortType.EVENT:
      sortedEvents = newEvents;
      break;
    case SortType.TIME:
      sortedEvents = newEvents.sort((a, b) => (b.end - b.start) - (a.end - a.start));
      break;
    case SortType.PRICE:
      sortedEvents = newEvents.sort((a, b) => b.price - a.price);
      break;
  }

  return sortedEvents;
};

// Получение дат маршрута
const getTripDates = (events) => {
  return Array.from(new Set(events.map((eventsItem) => eventsItem.start.toDateString())));
};

// Получение точек маршрута, сгруппированных по датам
const getEventsForDate = (events, date) => {
  return events.filter((eventsItem) => eventsItem.start.toDateString() === date);
};

// Контроллер маршрута
export default class TripEventsController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._tripEventsItemControllers = [];
    this._tripEventsMsgComponent = new TripEventsMsgComponent();
    this._tripSortComponent = new TripSortComponent();
    this._tripDaysComponent = new TripDaysComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._tripSortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._eventsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const container = this._container;
    const events = this._eventsModel.getEvents()
      .sort((a, b) => a.start > b.start ? 1 : -1);

    const noEvents = (events.length === 0);

    if (noEvents) {
      render(container, this._tripEventsMsgComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._tripSortComponent, RenderPosition.BEFOREEND);
    render(container, this._tripDaysComponent, RenderPosition.BEFOREEND);

    this._renderEvents(events);
  }

  _removeEvents() {
    this._tripEventsItemControllers.forEach((controller) => controller.destroy());
    this._tripEventsItemControllers = [];
    this._tripDaysComponent.clearElement();
  }

  _renderEvents(events) {
    const tripDaysElement = this._tripDaysComponent.getElement();

    const dates = getTripDates(events);

    const tripEvents = renderTripDays(tripDaysElement, events, dates, this._onDataChange, this._onViewChange);
    this._tripEventsItemControllers = tripEvents;
  }

  _renderSortedEvents(events, sortType) {
    const tripDaysElement = this._tripDaysComponent.getElement();

    const sortedEvents = getSortedEvents(events, sortType);

    const tripEvents = renderTripDaysItem(tripDaysElement, sortedEvents, this._onDataChange, this._onViewChange);
    this._tripEventsItemControllers = tripEvents;
  }

  _onDataChange(tripEventsItemController, oldData, newData) {
    if (oldData === EmptyEvent) {
      this._creatingEvent = null;
      if (newData === null) {
        tripEventsItemController.destroy();
      } else {
        this._eventsModel.addEventsItem(newData);
        tripEventsItemController.render(newData, Mode.DEFAULT);
      }
    } else if (newData === null) {
      this._eventsModel.removeEventsItem(oldData.id);
    } else {
      const isSuccess = this._eventsModel.updateEventsItem(oldData.id, newData);

      if (isSuccess) {
        tripEventsItemController.render(newData, Mode.DEFAULT);
      }
    }
  }

  _onViewChange() {
    this._tripEventsItemControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const events = this._eventsModel.getEvents();

    if (sortType === SortType.EVENT) {
      this._removeEvents();
      this._renderEvents(events);
    } else {
      this._removeEvents();
      this._renderSortedEvents(events, sortType);
    }
  }

  _onFilterChange() {
    this._tripSortComponent.resetSortType();
    this._removeEvents();
    this._renderEvents(this._eventsModel.getEvents());
  }
}
