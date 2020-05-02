// Компоненты
import TripEventsItemComponent from "../components/trip-events-item.js";
import TripEventsItemEditComponent from "../components/trip-events-item-edit.js";

// Утилиты
import {render, replace, RenderPosition} from "../utils/render.js";

// Контроллер точки маршрута
export default class TripEventsItemController {
  constructor(container) {
    this._container = container;

    this._tripEventsItemComponent = null;
    this._tripEventsItemEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(eventsItem) {
    this._tripEventsItemComponent = new TripEventsItemComponent(eventsItem);
    this._tripEventsItemEditComponent = new TripEventsItemEditComponent(eventsItem);

    this._tripEventsItemComponent.setEventRollupBtnClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._tripEventsItemEditComponent.setEventFavoriteBtnClickHandler(() => {

    });

    this._tripEventsItemEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToEvent();
    });

    render(this._container, this._tripEventsItemComponent, RenderPosition.BEFOREEND);
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    replace(this._tripEventsItemComponent, this._tripEventsItemEditComponent);
  }

  _replaceEventToEdit() {
    replace(this._tripEventsItemEditComponent, this._tripEventsItemComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
