// Импорт
import {createElement} from "../utils.js";

// Шаблон сообщения-заглушки
const createTripEventsMsgTemplate = () => {
  return (
    `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`
  );
};

// Класс
export default class TripEventsMsg {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripEventsMsgTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
