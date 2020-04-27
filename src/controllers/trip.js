// Компоненты
import TripSortComponent from "../components/trip-sort.js";
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
const renderTripEventsItem = (tripEventsListElement, eventsItem) => {
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

  render(tripEventsListElement, tripEventsItemComponent, RenderPosition.BEFOREEND);
};

// Отрисовка маршрута
const renderTripEvents = (tripEventsElement, events) => {
  const noEvents = (events.length === 0);

  if (noEvents) {
    render(tripEventsElement, new TripEventsMsgComponent(), RenderPosition.BEFOREEND);
    return;
  }

  render(tripEventsElement, new TripSortComponent(), RenderPosition.BEFOREEND);
  render(tripEventsElement, new TripDaysComponent(), RenderPosition.BEFOREEND);

  const tripDaysElement = tripEventsElement.querySelector(`.trip-days`);

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

// Контроллер
export default class TripController {
  constructor(container) {
    this._container = container;
  }

  render(events) {
    renderTripEvents(this._container, events);
  }
}
