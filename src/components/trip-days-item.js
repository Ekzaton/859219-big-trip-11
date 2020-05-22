// Компоненты
import AbstractComponent from "./abstract.js";

// Константы
import {MONTHS} from "../const.js";

// Шаблон дня маршрута
const createTripDaysItemTemplate = (date, index) => {
  const dateTime = new Date(date);

  const day = dateTime.getDate() || ``;
  const month = dateTime.getMonth() + 1 || ``;
  const year = dateTime.getFullYear() || ``;

  return (
    `<li class="trip-days__item day">
      <div class="day__info">
        <span class="day__counter">${index + 1 || ``}</span>
        <time class="day__date" datetime="${year}-${month}-${day}">
          ${MONTHS[month - 1] || ``}&nbsp;${day || ``}
        </time>
      </div>
      <ul class="trip-events__list"></ul>
    </li>`
  );
};

// Класс
export default class TripDaysItem extends AbstractComponent {
  constructor(date, index) {
    super();

    this._date = date;
    this._index = index;
  }

  getTemplate() {
    return createTripDaysItemTemplate(this._date, this._index);
  }
}
