// Перемещения
export const TRANSFERS = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`
];

// Меропориятия
export const ACTIVITIES = [
  `check-in`,
  `sightseeing`,
  `restaurant`
];

// Пункты меню
export const TabsItem = {
  TABLE: `control__table`,
  STATS: `control__stats`,
};

// Типы сортировки
export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

// Типы фильтров
export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

// Режимы отображения точки маршрута
export const Mode = {
  ADD: `add`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

// Методы HTTP
export const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

// Позиции для отрисовки
export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`,
};

// Плйсхолдеры для типов точки маршрута
export const TypePlaceholder = {
  "taxi": `to`,
  "bus": `to`,
  "train": `to`,
  "ship": `to`,
  "transport": `to`,
  "drive": `to`,
  "flight": `to`,
  "check-in": `in`,
  "sightseeing": `in`,
  "restaurant": `in`
};
