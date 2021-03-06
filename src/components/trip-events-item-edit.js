// Компоненты
import SmartComponent from "./smart-component.js";

// Утилиты
import {capitalize, TypePlaceholder} from "../utils/common.js";
import {getDateTime} from "../utils/datetime.js";

// Константы
import {ACTIVITIES, TRANSFERS} from "../const.js";

import {EmptyEventsItem} from "../controllers/trip-events-item.js";

// Библиотеки
import flatpickr from "flatpickr";

// Стили
import "flatpickr/dist/flatpickr.min.css";
import 'flatpickr/dist/themes/material_blue.css';

// Разметка типов точек маршрута
const createTypesMarkup = (types, currentType) => {
  return types.map((type) => {
    return (
      `<div class="event__type-item">
        <input id="event-type-${type}-1"
          class="event__type-input visually-hidden"
          type="radio"
          name="event-type"
          value="${type}"
          ${type === currentType ? `checked` : ``}
        >
        <label class="event__type-label event__type-label--${type}"
          for="event-type-${type}-1"
        >
          ${capitalize(type)}
        </label>
      </div>`
    );
  })
  .join(`\n`);
};

// Разметка пунктов назначения
const createDestinationsMarkup = (destinations, city) => {
  return destinations.map((destination) => {
    return (
      `<option
        value="${destination}"
        ${destination === city ? `selected` : ``}
      >
        ${destination}
      </option>`
    );
  })
  .join(`\n`);
};

// Разметка доп. опций
const createOffersMarkup = (offers, selectedOffers) => {
  return offers.map((offer) => {
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox visually-hidden"
          id="event-offer-${offer.title}-1"
          type="checkbox"
          name="event-offer-${offer.title}"
          ${selectedOffers.some((it) => it.title === offer.title) ? `checked` : ``}
        >
        <label class="event__offer-label"
          for="event-offer-${offer.title}-1"
        >
          <span class="event__offer-title">${offer.title}</span>
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
  return photos.map((photo) => {
    return (
      `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`
    );
  })
  .join(`\n`);
};

// Текст кнопок формы по умолчанию
const DefaultData = {
  submitBtnText: `Save`,
  resetBtnText: `Delete`
};

// Шаблон формы создания/редактирования точки маршрута
const createTripEventsItemEditTemplate = (eventsItem, options, destinations, offers) => {
  const {start, end, price, isFavorite} = eventsItem;
  const {type, city, description, photos, selectedOffers, externalData} = options;

  const addingEventsItem = (eventsItem === EmptyEventsItem);
  const noOffers = (offers[type].length === 0);

  const startDateTime = getDateTime(start);
  const endDateTime = getDateTime(end);

  const transfersMarkup = createTypesMarkup(TRANSFERS, type);
  const activitiesMarkup = createTypesMarkup(ACTIVITIES, type);
  const destinationsMarkup = createDestinationsMarkup(Object.keys(destinations), city);
  const offersMarkup = createOffersMarkup(offers[type], selectedOffers);
  const photosMarkup = createPhotosMarkup(photos);

  const submitBtnText = externalData.submitBtnText;
  const resetBtnText = externalData.resetBtnText;

  return (
    `<form class="trip-events__item event event--edit" action="#" method="post" autocomplete="off">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon"
              width="17"
              height="17"
              src="img/icons/${type}.png"
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
            ${capitalize(type)}&nbsp;${TypePlaceholder[type]}
          </label>
          <select class="event__input event__input--destination"
            id="event-destination-1"
            type="text"
            name="event-destination"
          >
            ${destinationsMarkup}
          </select>
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
            pattern="^[ 0-9]+$"
            maxlength="4"
            required
          >
        </div>

        <button class="event__save-btn btn btn--blue" type="submit">
          ${submitBtnText}
        </button>
        <button class="event__reset-btn" type="reset">
          ${addingEventsItem ? `Cancel` : resetBtnText}
        </button>

    ${addingEventsItem ? `` :
      `<input id="event-favorite-1"
          class="event__favorite-checkbox visually-hidden"
          type="checkbox"
          name="event-favorite"
          ${isFavorite ? `checked` : ``}
        >
        <label class="event__favorite-btn"
          for="event-favorite-1"
        >
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon"
            width="28"
            height="28"
            viewBox="0 0 28 28"
          >
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
      </label>`
    }

    ${addingEventsItem ? `` :
      `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`
    }

      </header>


      <section class="event__details">
    ${noOffers ? `` :
      `<section class="event__section event__section--offers">
        <h3 class="event__section-title event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offersMarkup}
        </div>
      </section>`
    }


      <section class="event__section event__section--destination">
        <h3 class="event__section-title event__section-title--destination">Destination</h3>
        <p class="event__destination-description">
          ${description}
        </p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${photosMarkup}
          </div>
        </div>
      </section>

      </section>
    </form>`
  );
};

// Класс
export default class TripEventsItemEdit extends SmartComponent {
  constructor(eventsItem, destinations, offers) {
    super();

    this._eventsItem = eventsItem;
    this._destinations = destinations;
    this._offers = offers;

    this._externalData = DefaultData;

    this._element = null;
    this._flatpickr = null;

    this._submitHandler = null;
    this._eventResetBtnClickHandler = null;
    this._eventRollupBtnClickHandler = null;
    this._eventFavoriteBtnClickHandler = null;

    this._initEventsItem(this._eventsItem);
    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createTripEventsItemEditTemplate(
        this._eventsItem,
        {
          type: this._type,
          city: this._city,
          description: this._description,
          photos: this._photos,
          selectedOffers: this._selectedOffers,
          externalData: this._externalData
        },
        this._destinations,
        this._offers
    );
  }

  getData() {
    const form = this.getElement();
    return new FormData(form);
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);

    this.rerender();
  }

  disable() {
    const elements = Array.from(this.getElement().elements);
    elements.forEach((element) => {
      element.disabled = true;
    });
  }

  showBoxShadow() {
    this.getElement().style.boxShadow = `0 0 4px 4px red`;
  }

  hideBoxShadow() {
    this.getElement().style.boxShadow = ``;
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setEventFavoriteBtnClickHandler(this._eventFavoriteBtnClickHandler);
    this.setEventResetBtnClickHandler(this._eventResetBtnClickHandler);
    this.setEventRollupBtnClickHandler(this._eventRollupBtnClickHandler);
    this._subscribeOnEvents();
  }

  removeElement() {
    this._destroyFlatpickr();

    super.removeElement();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  reset() {
    this._initEventsItem(this._eventsItem);

    this.rerender();
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  setEventFavoriteBtnClickHandler(handler) {
    const eventFavoriteBtn = this.getElement().querySelector(`.event__favorite-btn`);

    if (eventFavoriteBtn) {
      eventFavoriteBtn.addEventListener(`click`, handler);

      this._eventFavoriteBtnClickHandler = handler;
    }
  }

  setEventResetBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);

    this._eventResetBtnClickHandler = handler;
  }

  setEventRollupBtnClickHandler(handler) {
    const eventRollupBtn = this.getElement().querySelector(`.event__rollup-btn`);

    if (eventRollupBtn) {
      eventRollupBtn.addEventListener(`click`, handler);

      this._eventRollupBtnClickHandler = handler;
    }
  }

  setFlatpickr(dateElement, date) {
    this._flatpickr = flatpickr(dateElement, {
      'altInput': true,
      'enableTime': true,
      'time_24hr': true,
      'altFormat': `d/m/y H:i`,
      'defaultDate': date
    });
  }

  _initEventsItem(eventsItem) {
    this._type = eventsItem.type;
    this._start = eventsItem.start;
    this._end = eventsItem.end;
    this._city = eventsItem.city;
    this._description = eventsItem.description;
    this._photos = eventsItem.photos;
    this._price = eventsItem.price;
    this._selectedOffers = eventsItem.selectedOffers;
  }

  _applyFlatpickr() {
    this._destroyFlatpickr();

    const startDateTimeElement = this.getElement().querySelector(`#event-start-time-1`);
    const endDateTimeElement = this.getElement().querySelector(`#event-end-time-1`);

    this.setFlatpickr(startDateTimeElement, this._start);
    this.setFlatpickr(endDateTimeElement, this._end);
  }

  _destroyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`)
    .addEventListener(`change`, (evt) => {
      if (evt.target.tagName === `INPUT`) {
        this._type = evt.target.value;
      }

      this.rerender();
    });

    element.querySelector(`.event__input--destination`)
    .addEventListener(`change`, (evt) => {
      this._city = evt.target.value;
      this._description = this._destinations[this._city].description;
      this._photos = this._destinations[this._city].pictures;

      this.rerender();
    });
  }
}
