// Компоненты
import TripInfoComponent from "./components/trip-info.js";
import TripTabsComponent from "./components/trip-tabs.js";
import TripFiltersComponent from "./components/trip-filters.js";
import TripSortComponent from "./components/trip-sort.js";
import TripDaysComponent from "./components/trip-days.js";
import TripDaysItemComponent from "./components/trip-days-item.js";
import TripEventsItemEditComponent from "./components/trip-events-item-edit.js";
import TripEventsItemComponent from "./components/trip-events-item.js";
import {render, RenderPosition} from "./utils.js";

// Моки
import {generateTripEvents, getEventsForDate} from "./mock/trip-events-item.js";
import {getTripDates} from "./mock/trip-days-item.js";

// Константы
const EVENTS_COUNT = 20;

const events = generateTripEvents(EVENTS_COUNT);
const dates = getTripDates(events);

// Отрисовка точки маршрута и формы создания/редактирования
const renderTripEventsItem = (tripEventsListElement, eventsItem) => {
  const replaceEventToEdit = () => {
    tripEventsListElement.replaceChild(
        tripEventsItemEditElement,
        tripEventsItemElement
    );
  };

  const replaceEditToEvent = (evt) => {
    evt.preventDefault();
    tripEventsListElement.replaceChild(
        tripEventsItemElement,
        tripEventsItemEditElement
    );
  };

  const tripEventsItemElement = new TripEventsItemComponent(eventsItem).getElement();
  const eventRollupBtnElement = tripEventsItemElement.querySelector(`.event__rollup-btn`);
  eventRollupBtnElement.addEventListener(`click`, replaceEventToEdit);

  const tripEventsItemEditElement = new TripEventsItemEditComponent(eventsItem).getElement();
  const editFormElement = tripEventsItemEditElement.querySelector(`form`);
  editFormElement.addEventListener(`submit`, replaceEditToEvent);

  render(tripEventsListElement, tripEventsItemElement, RenderPosition.BEFOREEND);
};

const tripMainElement = document.querySelector(`.trip-main`);

// Отрисовка информации о маршруте и стоимости
render(tripMainElement, new TripInfoComponent(events).getElement(), RenderPosition.AFTERBEGIN);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

// Отрисовка меню и фильтров
render(tripControlsElement, new TripTabsComponent().getElement(), RenderPosition.BEFOREEND);
render(tripControlsElement, new TripFiltersComponent().getElement(), RenderPosition.BEFOREEND);

const tripEventsElement = document.querySelector(`.trip-events`);

// Отрисовка сортировки и списка дней
render(tripEventsElement, new TripSortComponent().getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new TripDaysComponent().getElement(), RenderPosition.BEFOREEND);

const tripDaysElement = tripEventsElement.querySelector(`.trip-days`);

// Отрисовка дней маршрута
dates.forEach((date, index) => {
  const tripDaysItemElement = new TripDaysItemComponent(date, index).getElement();

  render(tripDaysElement, tripDaysItemElement, RenderPosition.BEFOREEND);

  const tripEventsListElement = tripDaysItemElement.querySelector(`.trip-events__list`);

  const eventsForDate = getEventsForDate(events, date);

  eventsForDate.forEach((eventsItem) =>
    renderTripEventsItem(tripEventsListElement, eventsItem));
});
