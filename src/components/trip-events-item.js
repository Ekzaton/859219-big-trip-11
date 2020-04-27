// Импорт
import AbstractComponent from "./abstract.js";
import {formatDate, formatTime, getDurationTime} from "../utils.js";

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

  const pretext = (type.group === `transfer` ? `to` : `in`);

  const startDate = formatDate(start);
  const startTime = formatTime(start);

  const endDate = formatDate(end);
  const endTime = formatTime(end);

  const durationTime = getDurationTime(end - start);

  const offersMarkup = createOffersMarkup(offers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon"
            width="42"
            height="42"
            src="img/icons/${type.name.toLowerCase()}.png"
            alt="Event type icon"
          >
        </div>
        <h3 class="event__title">${type.name}&nbsp;${pretext}&nbsp;${city}</h3>
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
          <p class="event__duration">${durationTime}M</p>
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
}
