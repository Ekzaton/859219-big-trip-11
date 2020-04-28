// Компоненты
import TripInfoComponent from "./components/trip-info.js";
import TripTabsComponent from "./components/trip-tabs.js";
import TripFiltersComponent from "./components/trip-filters.js";

// Контроллеры
import TripController from "./controllers/trip.js";

// Утилиты
import {render, RenderPosition} from "./utils/render.js";

// Моки
import {generateTripEvents} from "./mock/trip-events-item.js";

// Константы
const EVENTS_COUNT = 20;

const events = generateTripEvents(EVENTS_COUNT);

const tripMainElement = document.querySelector(`.trip-main`);

// Отрисовка информации о маршруте и стоимости
render(tripMainElement, new TripInfoComponent(events), RenderPosition.AFTERBEGIN);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

// Отрисовка меню и фильтров
render(tripControlsElement, new TripTabsComponent(), RenderPosition.BEFOREEND);
render(tripControlsElement, new TripFiltersComponent(), RenderPosition.BEFOREEND);

const tripEventsElement = document.querySelector(`.trip-events`);

const tripController = new TripController(tripEventsElement);

tripController.render(events);
