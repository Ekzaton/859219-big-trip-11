// Импорт
import AbstractComponent from "./abstract.js";

// Типы сортировки
export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

// Шаблон секции сортировки
const createTripSortTemplate = (sortType) => {
  return (
    `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
      <span class="trip-sort__item trip-sort__item--day">
        ${sortType === SortType.EVENT ? `Day` : ``}
      </span>
      <div class="trip-sort__item trip-sort__item--event">
        <input id="sort-event"
          class="trip-sort__input visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-event"
          ${sortType === SortType.EVENT ? `checked` : ``}
        >
        <label class="trip-sort__btn"
          for="sort-event"
          data-sort-type="${SortType.EVENT}"
        >
          Event
        </label>
      </div>
      <div class="trip-sort__item trip-sort__item--time">
        <input id="sort-time"
          class="trip-sort__input visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-time"
          ${sortType === SortType.TIME ? `checked` : ``}
        >
        <label class="trip-sort__btn"
          for="sort-time"
          data-sort-type="${SortType.TIME}"
        >
          Time
        </label>
      </div>
      <div class="trip-sort__item trip-sort__item--price">
        <input id="sort-price"
          class="trip-sort__input visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-price"
          ${sortType === SortType.PRICE ? `checked` : ``}
        >
        <label class="trip-sort__btn"
          for="sort-price"
          data-sort-type="${SortType.PRICE}"
        >
          Price
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
    this._currenSortType = SortType.EVENT;
  }

  getTemplate() {
    return createTripSortTemplate(this._currenSortType);
  }

  getSortType() {
    return this._currenSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.className !== `trip-sort__btn`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);

      this.refreshElement();
    });
  }

  refreshElement() {
    this._element.innerHTML = ``;
    this._element.innerHTML = this.getTemplate();
  }
}
