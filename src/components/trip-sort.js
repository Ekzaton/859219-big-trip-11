// Компоненты
import AbstractComponent from "./abstract.js";

// Утилшиты
import {SORT_ITEMS} from "../const.js";

// Типы сортировки
export const SortType = {
  EVENT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`,
};

// Разметка опций сортировки
const createSortItemsMarkup = (sortItems) => {
  return sortItems.map((sortItem, isChecked) => {
    return (
      `<div class="trip-sort__item trip-sort__item--${sortItem.toLowerCase()}">
        <input id="${SortType[sortItem.toUpperCase()]}"
          class="trip-sort__input visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-${sortItem.toLowerCase()}"
          ${isChecked === 0 ? `checked` : ``}
        >
        <label class="trip-sort__btn" for="${SortType[sortItem.toUpperCase()]}">
          ${sortItem}
        </label>
      </div>`
    );
  })
  .join(`\n`);
};

// Шаблон секции сортировки
const createTripSortTemplate = () => {
  const sortItemsMarkup = createSortItemsMarkup(SORT_ITEMS);

  return (
    `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
      <span class="trip-sort__item trip-sort__item--day">Day</span>
        ${sortItemsMarkup}
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
    return createTripSortTemplate();
  }

  resetSortType() {
    if (this._currenSortType === SortType.EVENT) {
      return;
    }

    this._currenSortType = SortType.EVENT;
    this.getElement().querySelector(`#sort-event`).checked = true;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      const sortType = evt.target.id;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;
      handler(this._currenSortType);
    });
  }
}
