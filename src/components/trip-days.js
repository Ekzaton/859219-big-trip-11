// Компоненты
import Component from "./component.js";

// Шаблон списка дней
const createTripDaysTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

// Класс
export default class TripDays extends Component {
  getTemplate() {
    return createTripDaysTemplate();
  }

  clearElement() {
    this._element.innerHTML = ``;
  }
}
