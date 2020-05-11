// Компоненты
import TripEventsItemComponent from "../components/trip-events-item.js";
import TripEventsItemEditComponent from "../components/trip-events-item-edit.js";

// Утилиты
import {render, replace, remove, RenderPosition} from "../utils/render.js";

// Режимы отображения точки маршрута
const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
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

  render(eventsItem) {
    const oldTripEventsItemComponent = this._tripEventsItemComponent;
    const oldTripEventsItemEditComponent = this._tripEventsItemEditComponent;

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
    });

    this._tripEventsItemEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToEvent();
    });

    if (oldTripEventsItemComponent && oldTripEventsItemEditComponent) {
      replace(this._tripEventsItemComponent, oldTripEventsItemComponent);
      replace(this._tripEventsItemEditComponent, oldTripEventsItemEditComponent);
    } else {
      render(this._container, this._tripEventsItemComponent, RenderPosition.BEFOREEND);
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
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
