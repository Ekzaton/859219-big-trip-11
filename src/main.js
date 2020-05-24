// Компоненты
import StatisticsComponent from "./components/statistics.js";
import TripInfoComponent from "./components/trip-info.js";
import TripTabsComponent from "./components/trip-tabs.js";

// Контроллеры
import TripEventsController from "./controllers/trip-events.js";
import TripFiltersController from "./controllers/trip-filters.js";

// Моки
import {generateTripEvents} from "./mock/trip-events-item.js";

// Модели данных
import TripEventsModel from "./models/trip-events.js";

// Утилиты
import {render, RenderPosition} from "./utils/render.js";

// Константы
import {TabsItem} from "./const.js";
const EVENTS_COUNT = 20;

const eventsModel = new TripEventsModel();
const events = generateTripEvents(EVENTS_COUNT);
eventsModel.setEvents(events);

const tripMainElement = document.querySelector(`.trip-main`);
const tripMainTripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripMainEventAddBtnElement = tripMainElement.querySelector(`.trip-main__event-add-btn`);
const tripEventsElement = document.querySelector(`.trip-events`);

const tripInfoComponent = new TripInfoComponent(events);
const tripTabsComponent = new TripTabsComponent();
const statisticsComponent = new StatisticsComponent(eventsModel);

const tripFiltersController = new TripFiltersController(tripMainTripControlsElement, eventsModel);
const tripEventsController = new TripEventsController(tripEventsElement, eventsModel);

// Отрисовка
render(tripMainElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(tripMainTripControlsElement, tripTabsComponent, RenderPosition.BEFOREEND);
tripFiltersController.render();
tripEventsController.render();
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
