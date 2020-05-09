// Компоненты
import TripSortComponent, {SortType} from "../components/trip-sort.js";
import TripDaysComponent from "../components/trip-days.js";
import TripDaysItemComponent from "../components/trip-days-item.js";
import TripEventsMsgComponent from "../components/trip-events-msg.js";

// Контроллеры
import TripEventsItemController from "./trip-events-item.js";

// Утилиты
import {render, RenderPosition} from "../utils/render.js";

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
  let tripDays = [];

  dates.forEach((date, index) => {
    const eventsForDate = getEventsForDate(events, date);

    tripDays = tripDays.concat(renderTripDaysItem(container, eventsForDate, onDataChange, onViewChange, date, index));
  });

  return tripDays;
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

// Получение дат маршрута в порядке возрастания
const getTripDates = (events) => {
  const dates = Array.from(
      new Set(events.map((eventsItem) => eventsItem.start.toDateString()))
  );

  return dates.sort((a, b) => new Date(a) - new Date(b));
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

    this._events = [];
    this._dates = [];
    this._tripEventsItemControllers = [];
    this._tripEventsMsgComponent = new TripEventsMsgComponent();
    this._tripSortComponent = new TripSortComponent();
    this._tripDaysComponent = new TripDaysComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._tripSortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render() {
    const events = this._eventsModel.getEvents();
    this._dates = getTripDates(events);

    const noEvents = (events.length === 0);

    if (noEvents) {
      render(this._container, this._tripEventsMsgComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._container, this._tripSortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._tripDaysComponent, RenderPosition.BEFOREEND);

    this._renderEvents(events);
  }

  _renderEvents(events) {
    const tripDaysElement = this._tripDaysComponent.getElement();

    const tripEvents = renderTripDays(tripDaysElement, events, this._dates, this._onDataChange, this._onViewChange);
    this._tripEventsItemControllers = tripEvents;
  }

  _onDataChange(tripEventsItemController, oldData, newData) {
    const isSuccess = this._eventsModel.updateEventsItem(oldData.id, newData);

    if (isSuccess) {
      tripEventsItemController.render(newData);
    }
  }

  _onViewChange() {
    this._tripEventsItemControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._tripDaysComponent.clearElement();

    const tripDaysElement = this._tripDaysComponent.getElement();

    if (sortType === SortType.EVENT) {
      const tripEvents = renderTripDays(tripDaysElement, this._eventsModel.getEvents(), this._dates, this._onDataChange, this._onViewChange);
      this._tripEventsItemControllers = tripEvents;
    } else {
      const sortedEvents = getSortedEvents(this._eventsModel.getEvents(), sortType);

      const tripEvents = renderTripDaysItem(tripDaysElement, sortedEvents, this._onDataChange, this._onViewChange);
      this._tripEventsItemControllers = tripEvents;
    }
  }
}
