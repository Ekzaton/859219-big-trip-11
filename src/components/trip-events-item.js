// Компоненты
import AbstractComponent from "./abstract.js";

// Утилиты
import {placeholders} from "../utils/adapter.js";

// Библиотеки
import moment from "moment";

// Разметка доп. опций
const createOffersMarkup = (offers) => {
  return offers.map((offer) => {
    return (
      `<li class="event__offer">
        <span class="event__offer-name">${offer.name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </li>`
    );
  })
  .join(`\n`);
};

// Шаблон точки маршрута
const createTripEventsItemTemplate = (eventsItem) => {
  const {type, city, start, end, price, offers} = eventsItem;

  const startDate = moment(start).format(`YYYY-MM-DD`);
  const startTime = moment(start).format(`HH:mm`);

  const endDate = moment(end).format(`YYYY-MM-DD`);
  const endTime = moment(end).format(`HH:mm`);

  const duration = moment.duration(end - start).asMilliseconds();
  const durationTime = moment.utc(duration).format(`DD[D] HH[H] mm[M]`);

  const offersMarkup = createOffersMarkup(offers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon"
            width="42"
            height="42"
            src="img/icons/${type.toLowerCase()}.png"
            alt="Event type icon"
          >
        </div>
        <h3 class="event__title">
          ${placeholders.get(type.toLowerCase())}&nbsp;${city}
        </h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDate}T${startTime}">
              ${startTime}
            </time>
            &mdash;
            <time class="event__end-time" datetime="${endDate}T${endTime}">
              ${endTime}
            </time>
          </p>
          <p class="event__duration">${durationTime}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersMarkup}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

// Класс
export default class TripEventsItem extends AbstractComponent {
  constructor(eventsItem) {
    super();
    this._eventsItem = eventsItem;
  }

  getTemplate() {
    return createTripEventsItemTemplate(this._eventsItem);
  }

  setEventRollupBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
