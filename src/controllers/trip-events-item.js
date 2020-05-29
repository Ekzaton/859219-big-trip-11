// Компоненты
import TripEventsItemComponent from "../components/trip-events-item.js";
import TripEventsItemEditComponent from "../components/trip-events-item-edit.js";

// Модели
import TripEventsItemModel from "../models/trip-events-item.js";

// Утилиты
import {render, replace, remove} from "../utils/render.js";

// Константы
import {Mode, RenderPosition} from "../const.js";
const ANIMATION_TIMEOUT = 600;

// Пустая точка маршрута
export const EmptyEventsItem = {
  type: `taxi`,
  start: new Date(),
  end: new Date(),
  city: ``,
  description: ``,
  photos: [],
  price: 0,
  isFavorite: false,
  selectedOffers: []
};

const parseFormData = (formData, destinations) => {
  const city = document.querySelector(`#event-destination-1`).value;
  const selectedOffers = Array.from(document.querySelectorAll(
      `.event__offer-checkbox:checked + label[for^="event"]`));

  return new TripEventsItemModel({
    'type': formData.get(`event-type`),
    'date_from': formData.get(`event-start-time`),
    'date_to': formData.get(`event-end-time`),
    'destination': {
      'name': destinations[city].name,
      'description': destinations[city].description,
      'pictures': destinations[city].pictures
    },
    'base_price': Number(formData.get(`event-price`)),
    'is_favorite': Boolean(formData.get(`event-favorite`)),
    'offers': selectedOffers.map((offer) => ({
      'title': offer.querySelector(`.event__offer-title`).textContent,
      'price': Number(offer.querySelector(`.event__offer-price`).textContent)
    })),
  });
};

// Контроллер точки маршрута
export default class TripEventsItemController {
  constructor(container, destinations, offers, onDataChange, onViewChange) {
    this._container = container;
    this._destinations = destinations;
    this._offers = offers;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._tripEventsItemComponent = null;
    this._tripEventsItemEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(eventsItem, mode) {
    const oldTripEventsItemComponent = this._tripEventsItemComponent;
    const oldTripEventsItemEditComponent = this._tripEventsItemEditComponent;

    this._mode = mode;

    this._tripEventsItemComponent = new TripEventsItemComponent(eventsItem);
    this._tripEventsItemEditComponent = new TripEventsItemEditComponent(eventsItem, this._destinations, this._offers);

    this._tripEventsItemComponent.setEventRollupBtnClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._tripEventsItemEditComponent.setEventFavoriteBtnClickHandler(() => {
      const newEventsItem = TripEventsItemModel.clone(eventsItem);
      newEventsItem.isFavorite = !newEventsItem.isFavorite;

      this._onDataChange(this, eventsItem, newEventsItem);

      this._mode = Mode.EDIT;
    });

    this._tripEventsItemEditComponent.setEventResetBtnClickHandler(() => {
      this._tripEventsItemEditComponent.hideBoxShadow()
      this._tripEventsItemEditComponent.disable();
      this._tripEventsItemEditComponent.setData({
        resetBtnText: `Deleting...`,
      });;
      this._onDataChange(this, eventsItem, null);
    });

    this._tripEventsItemEditComponent.setEventRollupBtnClickHandler(() => {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._tripEventsItemEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const formData = this._tripEventsItemEditComponent.getData();
      const data = parseFormData(formData, this._destinations);
      this._tripEventsItemEditComponent.hideBoxShadow();
      this._tripEventsItemEditComponent.disable();
      this._tripEventsItemEditComponent.setData({
        submitBtnText: `Saving...`,
      });
      this._onDataChange(this, eventsItem, data);
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldTripEventsItemComponent && oldTripEventsItemEditComponent) {
          replace(this._tripEventsItemComponent, oldTripEventsItemComponent);
          replace(this._tripEventsItemEditComponent, oldTripEventsItemEditComponent);
        } else {
          const tripEventsListElement = this._container.querySelector(`.trip-events__list`);
          render(tripEventsListElement, this._tripEventsItemComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADD:
        if (oldTripEventsItemComponent && oldTripEventsItemEditComponent) {
          remove(oldTripEventsItemComponent);
          remove(oldTripEventsItemEditComponent);
        }
        const tripDaysElement = document.querySelector(`.trip-days`);
        render(tripDaysElement, this._tripEventsItemEditComponent, RenderPosition.AFTERBEGIN);
        document.addEventListener(`keydown`, this._onEscKeyDown);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  destroy() {
    remove(this._tripEventsItemEditComponent);
    remove(this._tripEventsItemComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  shake() {
    this._tripEventsItemEditComponent.getElement().style.animation =
      `shake ${ANIMATION_TIMEOUT / 1000}s`;
    this._tripEventsItemComponent.getElement().style.animation =
      `shake ${ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._tripEventsItemEditComponent.getElement().style.animation = ``;
      this._tripEventsItemComponent.getElement().style.animation = ``;

      this._tripEventsItemEditComponent.setData({
        resetBtnText: `Delete`,
        submitBtnText: `Save`,
      });
    }, ANIMATION_TIMEOUT);

    setTimeout(() => this._tripEventsItemEditComponent.showBoxShadow(), ANIMATION_TIMEOUT);
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._tripEventsItemEditComponent.reset();
    replace(this._tripEventsItemComponent, this._tripEventsItemEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replace(this._tripEventsItemEditComponent, this._tripEventsItemComponent);
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADD) {
        this._onDataChange(this, EmptyEventsItem, null);
      }

      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
