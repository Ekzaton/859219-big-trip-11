// Компоненты
import AbstractComponent from "./abstract.js";

// Константы
import {FILTERS} from "../const.js";
const FILTER_ID_PREFIX = `filter-`;

// Получение имени фильтра по ID
const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

// Разметка фильтров
const createFiltersMarkup = (filters) => {
  return filters.map((filter, isChecked) => {
    return (
      `<div class="trip-filters__filter">
        <input id="filter-${filter.toLowerCase()}"
          class="trip-filters__filter-input visually-hidden"
          type="radio"
          name="trip-filter"
          value="${filter.toLowerCase()}"
          ${isChecked === 0 ? `checked` : ``}
        >
        <label class="trip-filters__filter-label" for="filter-${filter.toLowerCase()}">
          ${filter}
        </label>
      </div>`
    );
  })
  .join(`\n`);
};

// Шаблон секции фильтров
const createTripFiltersTemplate = () => {
  const filtersMarkup = createFiltersMarkup(FILTERS);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersMarkup}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

// Класс
export default class TripFilters extends AbstractComponent {
  getTemplate() {
    return createTripFiltersTemplate();
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}
