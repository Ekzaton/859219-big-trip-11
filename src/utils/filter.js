// Утилиты
import {isFutureEventsItem, isPastEventsItem} from "./datetime.js";

// Константы
import {FilterType} from "../const.js";

// Получение полного списка точек маршрута
export const getEverythingEvents = (events) => {
  return events;
};

// Получение запланированных точек маршрута
export const getFutureEvents = (events, startDate) => {
  return events.filter((eventsItem) => {
    startDate = eventsItem.start;

    return isFutureEventsItem(startDate);
  });
};

// Получение пройденных точек маршрута
export const getPastEvents = (events, startDate) => {
  return events.filter((eventsItem) => {
    startDate = eventsItem.start;

    return isPastEventsItem(startDate);
  });
};

// Получение отфильтрованных точек маршрута
export const getEventsByFilter = (events, filterType) => {
  const currentDate = new Date();

  switch (filterType) {
    case FilterType.EVERYTHING:
      return events;
    case FilterType.FUTURE:
      return getFutureEvents(events, currentDate);
    case FilterType.PAST:
      return getPastEvents(events, currentDate);
  }

  return events;
};
