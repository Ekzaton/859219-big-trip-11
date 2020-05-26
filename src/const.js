// Аббревиатуры месяцев
export const MONTHS = [
  `Jan`,
  `Feb`,
  `Mar`,
  `Apr`,
  `May`,
  `Jun`,
  `Jul`,
  `Aug`,
  `Sept`,
  `Oct`,
  `Nov`,
  `Dec`,
];

// Точки маршрута - перемещения
export const TRANSFERS = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`
];

// Точки маршрута - меропориятия
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

// Опции сортировки
export const SORT_ITEMS = [`Event`, `Time`, `Price`];

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
