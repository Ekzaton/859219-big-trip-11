// Компоненты
import TripInfoComponent from "./components/trip-info.js";
import TripTabsComponent from "./components/trip-tabs.js";
import TripFiltersComponent from "./components/trip-filters.js";
import TripSortComponent from "./components/trip-sort.js";
import TripDaysComponent from "./components/trip-days.js";
import TripDaysItemComponent from "./components/trip-days-item.js";
import TripEventsMsgComponent from "./components/trip-events-msg.js";
import TripEventsItemEditComponent from "./components/trip-events-item-edit.js";
import TripEventsItemComponent from "./components/trip-events-item.js";
import {render, replace, RenderPosition} from "./utils/render.js";

// Моки
import {generateTripEvents, getEventsForDate} from "./mock/trip-events-item.js";
import {getTripDates} from "./mock/trip-days-item.js";

// Константы
const EVENTS_COUNT = 20;

const events = generateTripEvents(EVENTS_COUNT);
const dates = getTripDates(events);

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

const tripMainElement = document.querySelector(`.trip-main`);

// Отрисовка информации о маршруте и стоимости
render(tripMainElement, new TripInfoComponent(events), RenderPosition.AFTERBEGIN);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

// Отрисовка меню и фильтров
render(tripControlsElement, new TripTabsComponent(), RenderPosition.BEFOREEND);
render(tripControlsElement, new TripFiltersComponent(), RenderPosition.BEFOREEND);

const tripEventsElement = document.querySelector(`.trip-events`);

const noEvents = (events.length === 0);

// Отрисовка сортировки и списка дней
if (noEvents) {
  render(tripEventsElement, new TripEventsMsgComponent(), RenderPosition.BEFOREEND);
} else {
  render(tripEventsElement, new TripSortComponent(), RenderPosition.BEFOREEND);
  render(tripEventsElement, new TripDaysComponent(), RenderPosition.BEFOREEND);

  const tripDaysElement = tripEventsElement.querySelector(`.trip-days`);

  dates.forEach((date, index) => {
    const tripDaysItemComponent = new TripDaysItemComponent(date, index);

    // Отрисовка дней маршрута
    render(tripDaysElement, tripDaysItemComponent, RenderPosition.BEFOREEND);

    const tripEventsListElement = tripDaysItemComponent.getElement().querySelector(`.trip-events__list`);

    const eventsForDate = getEventsForDate(events, date);

    eventsForDate.forEach((eventsItem) =>
      renderTripEventsItem(tripEventsListElement, eventsItem));
  });
}
