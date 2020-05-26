// Компоненты
import TripEventsItemComponent from "../components/trip-events-item.js";
import TripEventsItemEditComponent from "../components/trip-events-item-edit.js";

// Модели
import TripEventsItemModel from "../models/trip-events-item.js";

// Утилиты
import {render, replace, remove, RenderPosition} from "../utils/render.js";

// Константы
import {Mode} from "../const.js";

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
  offers: []
};

// Контроллер точки маршрута
export default class TripEventsItemController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

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
    this._tripEventsItemEditComponent = new TripEventsItemEditComponent(eventsItem);

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
      this._onDataChange(this, eventsItem, null);
    });

    this._tripEventsItemEditComponent.setEventRollupBtnClickHandler(() => {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._tripEventsItemEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const newData = this._tripEventsItemEditComponent.getData();

      this._onDataChange(this, eventsItem, newData);
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
