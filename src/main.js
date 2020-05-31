// API
import API from "./api/index.js";
import Provider from "./api/provider.js";
import Store from "./api/store.js";

// Компоненты
import StatisticsComponent from "./components/statistics.js";
import TripDaysComponent from "./components/trip-days.js";
import TripEventsMsgLoadingComponent from "./components/trip-events-msg-loading.js";
import TripTabsComponent from "./components/trip-tabs.js";

// Контроллеры
import TripEventsController from "./controllers/trip-events.js";
import TripFiltersController from "./controllers/trip-filters.js";
import TripInfoController from "./controllers/trip-info.js";

// Модели данных
import TripEventsModel from "./models/trip-events.js";

// Утилиты
import {render, remove} from "./utils/render.js";

// Константы
import {AccessData, RenderPosition, StoreReqs, TabsItem} from "./const.js";
const STORE_NAME = `${StoreReqs.STORE_PREFIX}-${StoreReqs.STORE_VER}`;

const api = new API(AccessData.END_POINT, AccessData.AUTHORIZATION_KEY);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const tripEventsModel = new TripEventsModel();

const tripMainElement = document.querySelector(`.trip-main`);
const tripMainTripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripMainEventAddBtnElement = tripMainElement.querySelector(`.trip-main__event-add-btn`);
const tripEventsElement = document.querySelector(`.trip-events`);

const tripTabsComponent = new TripTabsComponent();
const tripEventsMsgLoadingComponent = new TripEventsMsgLoadingComponent();
const tripDaysComponent = new TripDaysComponent();
const statisticsComponent = new StatisticsComponent(tripEventsModel);

const tripInfoController = new TripInfoController(tripMainElement, tripEventsModel);
const tripFiltersController = new TripFiltersController(tripMainTripControlsElement, tripEventsModel);
const tripEventsController = new TripEventsController(tripDaysComponent, tripEventsModel, apiWithProvider);

// Отрисовка
tripInfoController.render();
render(tripMainTripControlsElement, tripTabsComponent, RenderPosition.AFTERBEGIN);
render(tripEventsElement, tripDaysComponent, RenderPosition.AFTERBEGIN);
tripFiltersController.render();
render(tripEventsElement, tripEventsMsgLoadingComponent, RenderPosition.AFTERBEGIN);
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
  apiWithProvider.getEvents(),
  apiWithProvider.getEventDestinations(),
  apiWithProvider.getEventOffers()
])
  .then(([events, destinations, offers]) => {
    tripEventsModel.setEvents(events);
    tripEventsModel.setEventDestinations(destinations);
    tripEventsModel.setEventOffers(offers);
    remove(tripEventsMsgLoadingComponent);
    tripEventsController.render();
  });

// Регистрация сервис-воркера
window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

// Добавление уведомления об оффлайне в заголовок
window.addEventListener(`offline`, () => {
  document.title += `[offline]`;
});

// Удаление уведомления об оффлайне из заголовка
window.addEventListener(`online`, () => {
  document.title = document.title.replace(`[offline]`, ``);
  apiWithProvider.sync();
});
