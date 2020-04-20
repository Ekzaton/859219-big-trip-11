import {formatDate, formatTime} from "../utils.js";

// Разметка выбранных доп. опций
const createOffersMarkup = () => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">Order Uber</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">20</span>
     </li>`
  );
};

// Шаблон точки маршрута
export const createTripEventsItemTemplate = (eventsItem) => {
  const {type, cityName, startDateTime, endDateTime, price, offers} = eventsItem;

  const startDate = formatDate(startDateTime);
  const startTime = formatTime(startDateTime);

  const endDate = formatDate(endDateTime);
  const endTime = formatTime(endDateTime);

  const offersMarkup = createOffersMarkup();

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} to ${cityName}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDate}T${startTime}">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDate}T${endTime}">${endTime}</time>
          </p>
          <p class="event__duration">30M</p>
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
