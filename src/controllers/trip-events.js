// Компоненты
import TripSortComponent, {SortType} from "../components/trip-sort.js";
import TripDaysComponent from "../components/trip-days.js";
import TripDaysItemComponent from "../components/trip-days-item.js";
import TripEventsMsgComponent from "../components/trip-events-msg.js";

// Контроллеры
import TripEventsItemController from "./trip-events-item.js";

// Моки
import {getEventsForDate} from "../mock/trip-events-item.js";
import {getTripDates} from "../mock/trip-days-item.js";

// Утилиты
import {render, RenderPosition} from "../utils/render.js";

// Отрисовка маршрута
const renderTripEvents = (container, events) => {
  const tripDaysElement = container.querySelector(`.trip-days`);

  const dates = getTripDates(events);

  dates.forEach((date, index) => {
    const tripDaysItemComponent = new TripDaysItemComponent(date, index);

    render(tripDaysElement, tripDaysItemComponent, RenderPosition.BEFOREEND);

    const tripEventsListElement = tripDaysItemComponent.getElement().querySelector(`.trip-events__list`);

    const eventsForDate = getEventsForDate(events, date);

    return eventsForDate.map((eventsItem) => {
      const tripEventsItemController = new TripEventsItemController(tripEventsListElement);

      tripEventsItemController.render(eventsItem);

      return tripEventsItemController;
    });
  });
};

// Отрисовка результатов сортировки
const renderSortedTripEvents = (container, sortedEvents) => {
  const tripDaysElement = container.querySelector(`.trip-days`);

  const tripDaysItemComponent = new TripDaysItemComponent();

  render(tripDaysElement, tripDaysItemComponent, RenderPosition.BEFOREEND);

  const tripEventsListElement = tripDaysItemComponent.getElement().querySelector(`.trip-events__list`);

  return sortedEvents.map((eventsItem) => {
    const tripEventsItemController = new TripEventsItemController(tripEventsListElement);

    tripEventsItemController.render(eventsItem);

    return tripEventsItemController;
  });
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

// Контроллер маршрута
export default class TripEventsController {
  constructor(container) {
    this._container = container;

    this._tripEventsMsgComponent = new TripEventsMsgComponent();
    this._tripSortComponent = new TripSortComponent();
    this._tripDaysComponent = new TripDaysComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._tripSortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(events) {
    this._events = events;

    const container = this._container;

    const noEvents = (events.length === 0);

    if (noEvents) {
      render(container, this._tripEventsMsgComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._tripSortComponent, RenderPosition.BEFOREEND);
    render(container, this._tripDaysComponent, RenderPosition.BEFOREEND);

    renderTripEvents(container, events);
  }

  _onSortTypeChange(sortType) {
    const container = this._container;

    const sortedEvents = getSortedEvents(this._events, sortType);

    this._tripDaysComponent.clearElement();

    if (sortType === SortType.EVENT) {
      renderTripEvents(container, this._events);
    } else {
      renderSortedTripEvents(container, sortedEvents);
    }
  }
}
