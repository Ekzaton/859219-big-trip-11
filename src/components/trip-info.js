// Компоненты
import Component from "./component.js";

// Утилиты
import {getDayMonth} from "../utils/datetime.js";

// Получение заголовка маршрута
const getTripInfoTitle = (events) => {
  const cities = events
    .sort((firstItem, secondItem) =>firstItem.start > secondItem.start ? 1 : -1)
    .map((eventsItem) => eventsItem.city);

  if (cities.length <= 3) {
    return cities.map((city) => city).join(`&nbsp;&mdash;&nbsp;`);
  } else {
    return cities[0]
      + `&nbsp;&mdash;&nbsp;&hellip;&nbsp;&mdash;&nbsp;`
      + cities[cities.length - 1];
  }
};

// Получение дат маршрута
const getTripInfoDates = (events) => {
  const start = events
    .sort((firstItem, secondItem) => firstItem.start > secondItem.start ? 1 : -1)
    .map((eventsItem) => eventsItem.start);
  const end = events
    .sort((firstItem, secondItem) => firstItem.start > secondItem.start ? 1 : -1)
    .map((eventsItem) => eventsItem.end);

  if (start[0] === undefined) {
    return ``;
  } else {
    return getDayMonth(new Date(start[0]))
        + `&nbsp;&mdash;&nbsp;`
        + getDayMonth(new Date(end[end.length - 1]));
  }
};

// Получение стоимости маршрута
const getTripInfoCost = (events) => events.reduce(getEventsCost, 0);
const getEventsCost = (total, eventsItem) =>
  total + eventsItem.price + eventsItem.selectedOffers.reduce(getOffersCost, 0);
const getOffersCost = (total, offer) => total + offer.price;

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
export default class TripInfo extends Component {
  constructor(events) {
    super();

    this._events = events;
  }

  getTemplate() {
    return createTripInfoTemplate(this._events);
  }
}
