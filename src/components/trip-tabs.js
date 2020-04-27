// Импорт
import AbstractComponent from "./abstract.js";

// Шаблон меню сайта
const createTripTabsTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs trip-tabs">
      <a class="trip-tabs__btn trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
  );
};

// Класс
export default class TripTabs extends AbstractComponent {
  getTemplate() {
    return createTripTabsTemplate();
  }
}
