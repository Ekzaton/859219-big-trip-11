// Импорт
import AbstractComponent from "./abstract.js";

// Шаблон сообщения-заглушки
const createTripEventsMsgTemplate = () => {
  return (
    `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`
  );
};

// Класс
export default class TripEventsMsg extends AbstractComponent {
  getTemplate() {
    return createTripEventsMsgTemplate();
  }
}
