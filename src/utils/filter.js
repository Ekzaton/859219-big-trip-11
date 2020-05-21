// Константы
import {FilterType} from "../const.js";

// Получение запланированных точек маршрута
export const getFutureEvents = (events) => {
  return events.filter((eventsItem) => eventsItem.start > Date.now());
};

// Получение пройденных точек маршрута
export const getPastEvents = (events) => {
  return events.filter((eventsItem) => eventsItem.end < Date.now());
};

// Получение отфильтрованных точек маршрута
export const getEventsByFilter = (events, filterType) => {
  switch (filterType) {
    case FilterType.EVERYTHING:
      return events;
    case FilterType.FUTURE:
      return getFutureEvents(events);
    case FilterType.PAST:
      return getPastEvents(events);
  }

  return events;
};
