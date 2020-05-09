// Компоненты
import TripInfoComponent from "./components/trip-info.js";
import TripTabsComponent from "./components/trip-tabs.js";
import TripFiltersComponent from "./components/trip-filters.js";

// Контроллеры
import TripEventsController from "./controllers/trip-events.js";

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

// Отрисовка меню и фильтров
render(tripControlsElement, new TripTabsComponent(), RenderPosition.BEFOREEND);
render(tripControlsElement, new TripFiltersComponent(), RenderPosition.BEFOREEND);

const tripEventsElement = document.querySelector(`.trip-events`);

const tripEventsController = new TripEventsController(tripEventsElement, eventsModel);

tripEventsController.render(events);
