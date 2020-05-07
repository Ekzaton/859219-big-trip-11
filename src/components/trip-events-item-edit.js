// Компоненты
import AbstractSmartComponent from "./abstract-smart.js";

// Моки
import {
  TRANSFERS,
  ACTIVITIES,
  CITIES,
  OFFERS,
  SENTENCES,
  generateRandomItems,
  generateRandomPhotos
} from "../mock/trip-events-item.js";

// Утилиты
import {placeholders} from "../utils/adapter.js";

// Библиотеки
import flatpickr from "flatpickr";
import moment from "moment";

// Стили
import "flatpickr/dist/flatpickr.min.css";

// Разметка типов точек маршрута
const createTypesMarkup = (types) => {
  return types.map((type) => {
    return (
      `<div class="event__type-item">
        <input id="event-type-${type.toLowerCase()}-1"
          class="event__type-input visually-hidden"
          type="radio"
          name="event-type"
          value="${type.toLowerCase()}"
        >
        <label class="event__type-label event__type-label--${type.toLowerCase()}"
          for="event-type-${type.toLowerCase()}-1"
        >
          ${type}
        </label>
      </div>`
    );
  })
  .join(`\n`);
};

// Разметка пунктов назначения
const createDestinationsMarkup = (destinations) => {
  return destinations.map((destination) => {
    return `<option value="${destination}"></option>`;
  })
  .join(`\n`);
};

// Разметка доп. опций
const createOffersMarkup = (offers) => {
  return offers.map((offer) => {
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox visually-hidden"
          id="event-offer-${offer.type}-1"
          type="checkbox"
          name="event-offer-${offer.type}"
        >
        <label class="event__offer-label"
          for="event-offer-${offer.type}-1"
        >
          <span class="event__offer-name">${offer.name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`
    );
  })
  .join(`\n`);
};

// Разметка фотографий
const createPhotosMarkup = (photos) => {
  return photos.map((source) => {
    return `<img class="event__photo" src="${source}" alt="Event photo">`;
  })
  .join(`\n`);
};

// Шаблон формы создания/редактирования точки маршрута
const createTripEventsItemEditTemplate = (eventsItem, destination, offer) => {
  const {start, end, price, isFavorite} = eventsItem;
  const {city, description, photos} = destination;
  const {type, offers} = offer;

  const startDateTime = moment(start).format(`DD/MM/YY HH:mm`);
  const endDateTime = moment(end).format(`DD/MM/YY HH:mm`);

  const transfersMarkup = createTypesMarkup(TRANSFERS);
  const activitiesMarkup = createTypesMarkup(ACTIVITIES);
  const destinationsMarkup = createDestinationsMarkup(CITIES);
  const offersMarkup = createOffersMarkup(offers);
  const photosMarkup = createPhotosMarkup(photos);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon"
                width="17"
                height="17"
                src="img/icons/${type.toLowerCase()}.png"
                alt="Event type icon"
              >
            </label>
            <input class="event__type-toggle visually-hidden"
              id="event-type-toggle-1"
              type="checkbox"
            >

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>

                ${transfersMarkup}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>

                ${activitiesMarkup}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group event__field-group--destination">
            <label class="event__label event__type-output"
              for="event-destination-1"
            >
              ${placeholders.get(type.toLowerCase())}
            </label>
            <input class="event__input event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${city}"
              list="destination-list-1"
            >
            <datalist id="destination-list-1">
              ${destinationsMarkup}
            </datalist>
          </div>

          <div class="event__field-group event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input event__input--time"
              id="event-start-time-1"
              type="text"
              name="event-start-time"
              value="${startDateTime}"
            >
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              value="${endDateTime}"
            >
          </div>

          <div class="event__field-group event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input event__input--price"
              id="event-price-1"
              type="text"
              name="event-price"
              value="${price}"
            >
          </div>

          <button class="event__save-btn btn btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1"
            class="event__favorite-checkbox visually-hidden"
            type="checkbox"
            name="event-favorite"
            ${isFavorite ? `checked` : ``}
          >
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon"
              width="28"
              height="28"
              viewBox="0 0 28 28"
            >
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">
          <section class="event__section event__section--offers">
            <h3 class="event__section-title event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offersMarkup}
            </div>
          </section>

          <section class="event__section event__section--destination">
            <h3 class="event__section-title event__section-title--destination">Destination</h3>
            <p class="event__destination-description">
              ${description.join(`\n`)}
            </p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${photosMarkup}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
};

// Класс
export default class TripEventsItemEdit extends AbstractSmartComponent {
  constructor(eventsItem) {
    super();

    this._eventsItem = eventsItem;

    this._city = eventsItem.city;
    this._description = eventsItem.description;
    this._photos = eventsItem.photos;
    this._type = eventsItem.type;
    this._offers = eventsItem.offers;

    this._flatpickr = null;

    this._submitHandler = null;
    this._eventFavoriteBtnClickHandler = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createTripEventsItemEditTemplate(
        this._eventsItem,
        {
          city: this._city,
          description: this._description,
          photos: this._photos
        },
        {
          type: this._type,
          offers: this._offers
        }
    );
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setEventFavoriteBtnClickHandler(this._eventFavoriteBtnClickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  reset() {
    const eventsItem = this._eventsItem;

    this._city = eventsItem.city;
    this._description = eventsItem.description;
    this._photos = eventsItem.photos;
    this._type = eventsItem.type;
    this._offers = eventsItem.offers;

    this.rerender();
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  setEventFavoriteBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);

    this._eventFavoriteBtnClickHandler = handler;
  }

  setFlatpickr(dateElement, date) {
    this._flatpickr = flatpickr(dateElement, {
      allowInput: true,
      enableTime: true,
      dateFormat: `d/m/y H:i`,
      defaultDate: date,
      minDate: this._eventsItem.start,
    });
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    const startDateTimeElement = this.getElement().querySelector(`#event-start-time-1`);
    const endDateTimeElement = this.getElement().querySelector(`#event-end-time-1`);

    this.setFlatpickr(startDateTimeElement, this._eventsItem.start);
    this.setFlatpickr(endDateTimeElement, this._eventsItem.end);
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`).addEventListener(`change`, (evt) => {
      if (this._type.toLowerCase() === evt.target.value) {
        return;
      }

      this._type = evt.target.value;
      this._offers = generateRandomItems(OFFERS);

      this.rerender();
    });

    element.querySelector(`.event__input--destination`).addEventListener(`change`, (evt) => {
      if (this._city === evt.target.value) {
        return;
      }

      this._city = evt.target.value;
      this._description = generateRandomItems(SENTENCES);
      this._photos = generateRandomPhotos();

      this.rerender();
    });
  }
}
