// Импорт
import {createInfoTemplate} from "./components/info.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createFilterTemplate} from "./components/filter.js";
import {createSortTemplate} from "./components/sort.js";
import {createMainContentTemplate} from "./components/main-content.js";
import {createPointEditTemplate} from "./components/point-edit.js";
import {createPointTemplate} from "./components/point.js";

// Константы
const POINT_COUNT = 3;

// Отрисовка компонента
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const tripMainElement = document.querySelector(`.trip-main`);

// Отрисовка маршрута и стоимости
render(tripMainElement, createInfoTemplate(), `afterbegin`);

const tripControlsElement = document.querySelector(`.trip-controls`);

// Отрисовка меню и фильтров
render(tripControlsElement.querySelector(`h2:first-of-type`), createSiteMenuTemplate(), `afterend`);
render(tripControlsElement.querySelector(`h2:last-of-type`), createFilterTemplate(), `afterend`);

const tripEventsElement = document.querySelector(`.trip-events`);

// Отрисовка сортировки, формы и основного контента
render(tripEventsElement, createSortTemplate(), `beforeend`);
render(tripEventsElement, createPointEditTemplate(), `beforeend`);
render(tripEventsElement, createMainContentTemplate(), `beforeend`);

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

// Отрисовка точек
for (let i = 0; i < POINT_COUNT; i++) {
  render(tripEventsListElement, createPointTemplate(), `beforeend`);
}
