// Импорт
import AbstractComponent from "./abstract.js";
import {getTripInfoTitle, getTripInfoDates, getTripInfoCost} from "../mock/trip-info.js";

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
export default class TripInfo extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripInfoTemplate(this._events);
  }
}
