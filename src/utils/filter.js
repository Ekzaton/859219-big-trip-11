// Константы
import {FilterType} from "../const.js";

// Получение запланированных точек маршрута
export const getFutureEvents = (events, currentDate) => {
  return events.filter((eventsItem) => eventsItem.start > currentDate);
};

// Получение пройденных точек маршрута
export const getPastEvents = (events, currentDate) => {
  return events.filter((eventsItem) => eventsItem.end < currentDate);
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
