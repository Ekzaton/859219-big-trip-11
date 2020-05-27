// Компоненты
import Component from "./component.js";

// Утилиты
import {getDate, getDayMonth} from "../utils/datetime.js";

// Шаблон дня маршрута
const createTripDaysItemTemplate = (date, index) => {
  let dayInfo = ``;

  if (date && index) {
    const dayDate = getDate(new Date(date));
    const dayMonth = getDayMonth(new Date(date));

    dayInfo = `<span class="day__counter">${index}</span>
              <time class="day__date" datetime="${dayDate}">${dayMonth}</time>`;
  }

  return (
    `<li class="trip-days__item day">
      <div class="day__info">${dayInfo}</div>
      <ul class="trip-events__list"></ul>
    </li>`
  );
};

// Класс
export default class TripDaysItem extends Component {
  constructor(date, index) {
    super();

    this._date = date;
    this._index = index;
  }

  getTemplate() {
    return createTripDaysItemTemplate(this._date, this._index);
  }
}
