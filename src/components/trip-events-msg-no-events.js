// Компоненты
import Component from "./component.js";

// Шаблон сообщения-заглушки при отсутствии точек маршрута
const createTripEventsMsgNoEventsTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

// Класс
export default class TripEventsMsgNoEvents extends Component {
  getTemplate() {
    return createTripEventsMsgNoEventsTemplate();
  }
}
