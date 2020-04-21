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
import {generateTripEvents} from "./mock/trip-events-item.js";

// Константы
const EVENTS_COUNT = 15;

// Отрисовка компонента
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);

// Отрисовка маршрута и стоимости
render(tripMainElement, createTripInfoTemplate(), `afterbegin`);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

// Отрисовка меню и фильтров
render(tripControlsElement.querySelector(`h2:first-of-type`), createTripTabsTemplate(), `afterend`);
render(tripControlsElement.querySelector(`h2:last-of-type`), createTripFiltersTemplate(), `afterend`);

const tripEventsElement = document.querySelector(`.trip-events`);

const events = generateTripEvents(EVENTS_COUNT);

// Отрисовка сортировки и маршрута
render(tripEventsElement, createTripSortTemplate(), `beforeend`);
render(tripEventsElement, createTripDaysTemplate(), `beforeend`);

const tripDaysElement = tripEventsElement.querySelector(`.trip-days`);

// Отрисовка дней маршрута
render(tripDaysElement, createTripDaysItemTemplate(), `beforeend`);

const tripEventsListElement = tripDaysElement.querySelector(`.trip-events__list`);

// Отрисовка формы редактирования и точек маршрута
render(tripEventsListElement, createTripEventsItemEditTemplate(events[0]), `beforeend`);

for (let i = 1; i < events.length; i++) {
  render(tripEventsListElement, createTripEventsItemTemplate(events[i]), `beforeend`);
}
