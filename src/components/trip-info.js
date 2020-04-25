// Импорт
import {
  getTripInfoTitle,
  getTripInfoDates,
  getTripInfoCost
} from "../mock/trip-info.js";
import {createElement} from "../utils.js";

// Шаблон информации о маршруте и стоимости
const createTripInfoTemplate = (events) => {
  const title = getTripInfoTitle(events);
  const dates = getTripInfoDates(events);
  const cost = getTripInfoCost(events);

  return (
    `<section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>
        <p class="trip-info__dates">${dates}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>`
  );
};

// Класс
export default class TripInfo {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._events);
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
