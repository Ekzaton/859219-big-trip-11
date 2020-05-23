// Компоненты
import Component from "./component.js";

// Константы
const ACTIVE_CLASS = `trip-tabs__btn--active`;

// Шаблон меню сайта
const createTripTabsTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs trip-tabs">
      <a id="control__table" class="trip-tabs__btn trip-tabs__btn--active" href="#">Table</a>
      <a id="control__stats" class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
  );
};

// Класс
export default class TripTabs extends Component {
  getTemplate() {
    return createTripTabsTemplate();
  }

  setActiveItem(tabsItem) {
    this.getElement().querySelectorAll(`.trip-tabs__btn`)
    .forEach((item) => {
      if (item.id === tabsItem) {
        item.classList.add(ACTIVE_CLASS);
      } else {
        item.classList.remove(ACTIVE_CLASS);
      }
    });
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      const tabsItem = evt.target.id;

      handler(tabsItem);
    });
  }
}
