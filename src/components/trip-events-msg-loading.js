// Компоненты
import Component from "./component.js";

// Шаблон сообщения-заглушки при загрузке точек маршрута
const createTripEventsMsgLoadingTemplate = () => {
  return (
    `<p class="trip-events__msg">Loading...</p>`
  );
};

// Класс
export default class TripEventsMsgLoading extends Component {
  getTemplate() {
    return createTripEventsMsgLoadingTemplate();
  }
}
