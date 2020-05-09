// Компоненты
import AbstractComponent from "./abstract.js";

// Константы
const FILTER_ID_PREFIX = `filter-`;

// Получение имени филтра по ID
const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

// Шаблон секции фильтров
const createTripFiltersTemplate = () => {
  return (
    `<form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="everything" checked>
        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
      </div>
      <div class="trip-filters__filter">
        <input id="filter-future" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="future">
        <label class="trip-filters__filter-label" for="filter-future">Future</label>
      </div>
      <div class="trip-filters__filter">
        <input id="filter-past" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="past">
        <label class="trip-filters__filter-label" for="filter-past">Past</label>
      </div>
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
