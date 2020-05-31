// Компоненты
import Component from "./component.js";

// Утилиты
import {capitalize} from "../utils/common.js";

// Константы
import {SortType} from "../const.js";
const SORT_ITEMS = Object.values(SortType);
const SORT_ITEM_ID_PREFIX = `sort-`;

// Получение типа сортировки по ID
const getSortTypeById = (id) => {
  return id.substring(SORT_ITEM_ID_PREFIX.length);
};

// Разметка опций сортировки
const createSortItemsMarkup = (sortItems) => {
  return sortItems.map((sortItem, isChecked) => {
    return (
      `<div class="trip-sort__item trip-sort__item--${sortItem}">
        <input id="sort-${sortItem}"
          class="trip-sort__input visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-${sortItem}"
          ${isChecked === 0 ? `checked` : ``}
        >
        <label class="trip-sort__btn" for="sort-${sortItem}">
          ${capitalize(sortItem)}
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
export default class TripSort extends Component {
  constructor() {
    super();

    this._currentSortType = SortType.EVENT;
  }

  getTemplate() {
    return createTripSortTemplate();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      const sortType = getSortTypeById(evt.target.id);

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      if (sortType === SortType.EVENT) {
        this.getElement().querySelector(`.trip-sort__item--day`).textContent = `Day`;
      } else {
        this.getElement().querySelector(`.trip-sort__item--day`).textContent = ``;
      }

      handler(this._currentSortType);
    });
  }
}
