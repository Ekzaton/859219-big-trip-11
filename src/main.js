// Компоненты
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
const EVENTS_COUNT = 20;

const events = generateTripEvents(EVENTS_COUNT);
const eventsModel = new TripEventsModel();
eventsModel.setEvents(events);

const tripMainElement = document.querySelector(`.trip-main`);

// Отрисовка информации о маршруте и стоимости
render(tripMainElement, new TripInfoComponent(events), RenderPosition.AFTERBEGIN);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

// Отрисовка меню
render(tripControlsElement, new TripTabsComponent(), RenderPosition.BEFOREEND);

// Отрисовка фильтров
const tripFiltersController = new TripFiltersController(tripControlsElement, eventsModel);
tripFiltersController.render();

const tripEventsElement = document.querySelector(`.trip-events`);

// Отрисовка точек маршрута
const tripEventsController = new TripEventsController(tripEventsElement, eventsModel);
tripEventsController.render(events);
