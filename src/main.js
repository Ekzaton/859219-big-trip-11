// Компоненты
import {createTripInfoTemplate} from "./components/trip-info.js";
import {createTripTabsTemplate} from "./components/trip-tabs.js";
import {createTripFiltersTemplate} from "./components/trip-filters.js";
import {createTripSortTemplate} from "./components/trip-sort.js";
import {createTripDaysTemplate} from "./components/trip-days.js";
import {createTripDaysItemTemplate} from "./components/trip-days-item.js";
import {createTripEventsItemEditTemplate} from "./components/trip-events-item-edit.js";
import {createTripEventsItemTemplate} from "./components/trip-events-item.js";

// Моки
import {generateTripEvents, getEventsForDate} from "./mock/trip-events-item.js";
import {getTripDates} from "./mock/trip-days-item.js";


// Константы
const EVENTS_COUNT = 20;

// Отрисовка компонента
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const events = generateTripEvents(EVENTS_COUNT);

const tripMainElement = document.querySelector(`.trip-main`);

// Отрисовка маршрута и стоимости
render(tripMainElement, createTripInfoTemplate(events), `afterbegin`);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

// Отрисовка меню и фильтров
render(tripControlsElement.querySelector(`h2:first-of-type`), createTripTabsTemplate(), `afterend`);
render(tripControlsElement.querySelector(`h2:last-of-type`), createTripFiltersTemplate(), `afterend`);

const tripEventsElement = document.querySelector(`.trip-events`);

// Отрисовка сортировки и маршрута
render(tripEventsElement, createTripSortTemplate(), `beforeend`);
render(tripEventsElement, createTripDaysTemplate(), `beforeend`);

const dates = getTripDates(events);

const tripDaysElement = tripEventsElement.querySelector(`.trip-days`);

// Отрисовка дней маршрута
render(tripDaysElement, createTripDaysItemTemplate(dates), `beforeend`);

const tripEventsListElements = Array.from(document.querySelectorAll(`.trip-events__list`));

render(tripEventsListElements[0], createTripEventsItemEditTemplate(events[0]), `beforeend`);

// Отрисовка формы редактирования и точек маршрута
dates.forEach((date, index) => {
  const filteredEvents = getEventsForDate(events, date);

  filteredEvents.forEach((eventsItem) =>
    render(tripEventsListElements[index], createTripEventsItemTemplate(eventsItem), `beforeend`));
});
