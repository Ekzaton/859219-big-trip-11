// Импорт
import {MONTHS} from "../const.js";
import {createElement} from "../utils.js";

// Шаблон дня
const createTripDaysItemTemplate = (dates) => {
  return dates.map((date, counter) => {
    const dateTime = new Date(date);

    const day = dateTime.getDate();
    const month = dateTime.getMonth();
    const year = dateTime.getYear();

    return (
      `<li class="trip-days__item day">
        <div class="day__info">
          <span class="day__counter">${counter + 1}</span>
          <time class="day__date" datetime="${year}-${month + 1}-${day}">
            ${MONTHS[month]}&nbsp;${day}
          </time>
        </div>
        <ul class="trip-events__list"></ul>
      </li>`
    );
  }).
  join(`\n`);
};

// Класс
export default class TripDaysItem {
  constructor(dates) {
    this._dates = dates;
    this._element = null;
  }

  getTemplate() {
    return createTripDaysItemTemplate(this._dates);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
