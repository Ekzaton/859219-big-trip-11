// Компоненты
import TripEventsItemComponent from "../components/trip-events-item.js";
import TripEventsItemEditComponent from "../components/trip-events-item-edit.js";

// Утилиты
import {render, replace, remove, RenderPosition} from "../utils/render.js";

// Режимы отображения точки маршрута
export const Mode = {
  CREATING: `creating`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

// Пустая точка маршрута
export const EmptyEventsItem = {
  id: String(new Date() + Math.random()),
  type: `taxi`,
  city: ``,
  start: new Date(),
  end: new Date(),
  price: ``,
  offers: [],
  description: ``,
  photos: [],
  isFavorite: false
};

// Парсинг данных с формы
const parseFormData = (formData) => {
  return {
    type: formData.get(`event-type`),
    city: formData.get(`event-destination`),
    start: formData.get(`event-start-time`),
    end: formData.get(`event-end-time`),
    price: formData.get(`event-price`)
  };
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
      this._onDataChange(this, eventsItem, Object.assign({}, eventsItem, {
        isFavorite: !eventsItem.isFavorite,
      }));

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
      const formData = this._tripEventsItemEditComponent.getData();
      const data = parseFormData(formData);

      this._onDataChange(this, eventsItem, Object.assign({}, eventsItem, data));
      this._replaceEditToEvent();
    });

    const tripEventsListElement = this._container.querySelector(`.trip-events__list`);

    switch (mode) {
      case Mode.DEFAULT:
        if (oldTripEventsItemComponent && oldTripEventsItemEditComponent) {
          replace(this._tripEventsItemComponent, oldTripEventsItemComponent);
          replace(this._tripEventsItemEditComponent, oldTripEventsItemEditComponent);
        } else {
          render(tripEventsListElement, this._tripEventsItemComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.CREATING:
        if (oldTripEventsItemComponent && oldTripEventsItemEditComponent) {
          remove(oldTripEventsItemComponent);
          remove(oldTripEventsItemEditComponent);
        }

        render(tripEventsListElement, this._tripEventsItemEditComponent, RenderPosition.AFTERBEGIN);
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
      if (this._mode === Mode.CREATING) {
        this._onDataChange(this, EmptyEventsItem, null);
      }

      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
