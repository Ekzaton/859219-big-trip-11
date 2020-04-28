// Импорт
import AbstractComponent from "./abstract.js";

// Типы сортировки
export const SortType = {
  EVENT: `Event`,
  TIME: `Time`,
  PRICE: `Price`,
};

// Шаблон секции сортировки
const createTripSortTemplate = () => {
  return (
    `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
      <span class="trip-sort__item trip-sort__item--day">Day</span>
      <div class="trip-sort__item trip-sort__item--event">
        <input id="sort-${SortType.EVENT.toLowerCase()}"
          class="trip-sort__input visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-${SortType.EVENT.toLowerCase()}"
        >
        <label class="trip-sort__btn"
          for="sort-${SortType.EVENT.toLowerCase()}"
        >
          ${SortType.EVENT}
        </label>
      </div>
      <div class="trip-sort__item trip-sort__item--time">
        <input id="sort-${SortType.TIME.toLowerCase()}"
          class="trip-sort__input visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-${SortType.TIME.toLowerCase()}"
          checked
        >
        <label class="trip-sort__btn trip-sort__btn--active trip-sort__btn--by-increase"
          for="sort-${SortType.TIME.toLowerCase()}"
        >
          ${SortType.TIME}
        </label>
      </div>
      <div class="trip-sort__item trip-sort__item--price">
        <input id="sort-${SortType.PRICE.toLowerCase()}"
          class="trip-sort__input visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-${SortType.PRICE.toLowerCase()}">
        <label class="trip-sort__btn"
          for="sort-${SortType.PRICE.toLowerCase()}"
        >
          ${SortType.PRICE}
        </label>
      </div>
      <span class="trip-sort__item trip-sort__item--offers">Offers</span>
    </form>`
  );
};

// Класс
export default class TripSort extends AbstractComponent {
  constructor() {
    super();

    this._currenSortType = SortType.TIME;
  }

  getTemplate() {
    return createTripSortTemplate();
  }

  getSortType() {
    return this._currenSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `LABEL`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }
}
