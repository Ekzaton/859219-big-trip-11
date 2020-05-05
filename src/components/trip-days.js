// Компоненты
import AbstractComponent from "./abstract.js";

// Шаблон списка дней
const createTripDaysTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

// Класс
export default class TripDays extends AbstractComponent {
  getTemplate() {
    return createTripDaysTemplate();
  }

  clearElement() {
    this._element.innerHTML = ``;
  }
}
