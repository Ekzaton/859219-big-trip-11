// Компоненты
import TripSortComponent, {SortType} from "../components/trip-sort.js";
import TripDaysComponent from "../components/trip-days.js";
import TripDaysItemComponent from "../components/trip-days-item.js";
import TripEventsMsgComponent from "../components/trip-events-msg.js";
import TripEventsItemEditComponent from "../components/trip-events-item-edit.js";
import TripEventsItemComponent from "../components/trip-events-item.js";

// Утилиты
import {render, replace, RenderPosition} from "../utils/render.js";

// Моки
import {getEventsForDate} from "../mock/trip-events-item.js";
import {getTripDates} from "../mock/trip-days-item.js";

// Отрисовка точки маршрута и формы создания/редактирования
const renderTripEventsItem = (container, eventsItem) => {
  const replaceEventToEdit = () => {
    replace(tripEventsItemEditComponent, tripEventsItemComponent);
  };

  const replaceEditToEvent = () => {
    replace(tripEventsItemComponent, tripEventsItemEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const tripEventsItemComponent = new TripEventsItemComponent(eventsItem);
  const tripEventsItemEditComponent = new TripEventsItemEditComponent(eventsItem);

  tripEventsItemComponent.setEventRollupBtnClickHandler(() => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  tripEventsItemEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(container, tripEventsItemComponent, RenderPosition.BEFOREEND);
};

// Отрисовка маршрута
const renderTripEvents = (container, events) => {
  const tripDaysElement = container.querySelector(`.trip-days`);

  const dates = getTripDates(events);

  dates.forEach((date, index) => {
    const tripDaysItemComponent = new TripDaysItemComponent(date, index);

    render(tripDaysElement, tripDaysItemComponent, RenderPosition.BEFOREEND);

    const tripEventsListElement = tripDaysItemComponent.getElement().querySelector(`.trip-events__list`);

    const eventsForDate = getEventsForDate(events, date);

    eventsForDate.forEach((eventsItem) =>
      renderTripEventsItem(tripEventsListElement, eventsItem));
  });
};

// Отрисовка результатов сортировки
const renderSortedTripEvents = (container, sortedEvents) => {
  const tripDaysElement = container.querySelector(`.trip-days`);

  const tripDaysItemComponent = new TripDaysItemComponent();

  render(tripDaysElement, tripDaysItemComponent, RenderPosition.BEFOREEND);

  const tripEventsListElement = tripDaysItemComponent.getElement().querySelector(`.trip-events__list`);

  sortedEvents.forEach((eventsItem) =>
    renderTripEventsItem(tripEventsListElement, eventsItem));
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

// Контроллер
export default class TripEventsController {
  constructor(container) {
    this._container = container;
    this._tripEventsMsgComponent = new TripEventsMsgComponent();
    this._tripSortComponent = new TripSortComponent();
    this._tripDaysComponent = new TripDaysComponent();
  }

  render(events) {
    const container = this._container;

    const noEvents = (events.length === 0);

    if (noEvents) {
      render(container, this._tripEventsMsgComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._tripSortComponent, RenderPosition.BEFOREEND);
    render(container, this._tripDaysComponent, RenderPosition.BEFOREEND);

    renderTripEvents(container, events);

    this._tripSortComponent.setSortTypeChangeHandler((sortType) => {

      const sortedEvents = getSortedEvents(events, sortType);

      this._tripDaysComponent.getElement().innerHTML = ``;

      if (sortType === SortType.EVENT) {
        renderTripEvents(container, events);
      } else {
        renderSortedTripEvents(container, sortedEvents);
      }
    });
  }
}
