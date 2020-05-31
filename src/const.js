// Меропориятия
export const ACTIVITIES = [
  `check-in`,
  `sightseeing`,
  `restaurant`
];

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

// Данные для доступа
export const AccessData = {
  END_POINT: `https://11.ecmascript.pages.academy/big-trip`,
  AUTHORIZATION_KEY: `Basic t94tjmg34`
};

// Типы фильтров
export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

// Методы HTTP
export const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

// Режимы отображения точки маршрута
export const Mode = {
  ADD: `add`,
  DEFAULT: `default`,
  EDIT: `edit`
};

// Позиции для отрисовки
export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

// Типы сортировки
export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};

// Реквизиты хранилища
export const StoreReqs = {
  PREFIX: `bigtrip-cache`,
  VER: `v1`
};

// Пункты меню
export const TabsItem = {
  TABLE: `control__table`,
  STATS: `control__stats`
};
