// Компоненты
import Component from "./component.js";

// Утилиты
import {capitalize, TypePlaceholder} from "../utils/common.js";
import {getDate, getTime, getDuration} from "../utils/datetime.js";

// Разметка доп. опций
const createOffersMarkup = (offers) => {
  return offers.map((offer) => {
    return (
      `<li class="event__offer">
        <span class="event__offer-name">${offer.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </li>`
    );
  })
  .join(`\n`);
};

// Шаблон точки маршрута
const createTripEventsItemTemplate = (eventsItem) => {
  const {type, city, start, end, price, selectedOffers} = eventsItem;

  const startDate = getDate(start);
  const startTime = getTime(start);

  const endDate = getDate(end);
  const endTime = getTime(end);

  const duration = getDuration(start, end);
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  const offersMarkup = createOffersMarkup(selectedOffers.slice(0, 3));

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon"
            width="42"
            height="42"
            src="img/icons/${type}.png"
            alt="Event type icon"
          >
        </div>
        <h3 class="event__title">
          ${capitalize(type)}&nbsp;${TypePlaceholder[type]}&nbsp;${city}
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
          <p class="event__duration">
            ${days ? days + `D` : ``}
            ${hours ? hours + `H` : ``}
            ${minutes ? minutes + `M` : ``}
          </p>
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
export default class TripEventsItem extends Component {
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
