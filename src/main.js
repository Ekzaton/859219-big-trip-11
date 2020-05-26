// Компоненты
import StatisticsComponent from "./components/statistics.js";
// import TripInfoComponent from "./components/trip-info.js";
import TripTabsComponent from "./components/trip-tabs.js";

// Контроллеры
import TripEventsController from "./controllers/trip-events.js";
import TripFiltersController from "./controllers/trip-filters.js";

// Модели данных
import TripEventsModel from "./models/trip-events.js";

// Утилиты
import {render, RenderPosition} from "./utils/render.js";

// API
import API from "./api.js";

// Константы
import {TabsItem} from "./const.js";
const AUTHORIZATION_KEY = `Basic 3fji6rytyyttgrg@`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;

const api = new API(END_POINT, AUTHORIZATION_KEY);
const tripEventsModel = new TripEventsModel();

const tripMainElement = document.querySelector(`.trip-main`);
const tripMainTripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripMainEventAddBtnElement = tripMainElement.querySelector(`.trip-main__event-add-btn`);
const tripEventsElement = document.querySelector(`.trip-events`);

// const tripInfoComponent = new TripInfoComponent();
const tripTabsComponent = new TripTabsComponent();
const statisticsComponent = new StatisticsComponent(tripEventsModel);

const tripFiltersController = new TripFiltersController(tripMainTripControlsElement, tripEventsModel);
const tripEventsController = new TripEventsController(tripEventsElement, tripEventsModel, api);

// Отрисовка
// render(tripMainElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(tripMainTripControlsElement, tripTabsComponent, RenderPosition.AFTERBEGIN);
tripFiltersController.render();
render(tripEventsElement, statisticsComponent, RenderPosition.AFTEREND);
statisticsComponent.hide();

// Переключение пунктов меню
tripTabsComponent.setOnChange((tabsItem) => {
  tripTabsComponent.setActiveItem(tabsItem);
  switch (tabsItem) {
    case TabsItem.TABLE:
      tripEventsController.show();
      statisticsComponent.hide();
      break;
    case TabsItem.STATS:
      tripEventsController.hide();
      statisticsComponent.show();
      break;
  }
});

// Добавление точки маршрута
tripMainEventAddBtnElement.addEventListener(`click`, () => {
  tripEventsController.addEventsItem();
});

Promise.all([
  api.getEvents(),
  api.getEventDestinations(),
  api.getEventOffers()
])
  .then((res) => {
    tripEventsModel.setEvents(res[0]);
    tripEventsController.render();
  });
