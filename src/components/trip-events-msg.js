// Компоненты
import Component from "./component.js";

// Шаблон сообщения-заглушки
const createTripEventsMsgTemplate = () => {
  return (
    `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`
  );
};

// Класс
export default class TripEventsMsg extends Component {
  getTemplate() {
    return createTripEventsMsgTemplate();
  }
}
