// Импорт
import {MONTHS} from "../const.js";

// Получение заголовка маршрута
export const getTripInfoTitle = (events) => {
  const cities = events.map((eventsItem) => eventsItem.city);

  if (cities.length <= 3) {
    return cities.map((city) => city).join(`&nbsp;&mdash;&nbsp;`);
  } else {
    return cities[0]
      + `&nbsp;&mdash;&nbsp;&hellip;&nbsp;&mdash;&nbsp;`
      + cities[cities.length - 1];
  }
};

// Получение дат маршрута
export const getTripInfoDates = (events) => {
  const start = events.map((eventsItem) => eventsItem.start);
  const end = events.map((eventsItem) => eventsItem.end);

  const startMonth = MONTHS[start[0].getMonth()];
  const startDay = start[0].getDate();

  const endMonth = MONTHS[end[end.length - 1].getMonth()];
  const endDay = end[end.length - 1].getDate();

  if (startMonth === endMonth) {
    return startMonth + `&nbsp;` + startDay + `&nbsp;&mdash;&nbsp;` + endDay;
  } else {
    return startMonth + `&nbsp;` + startDay + `&nbsp;&mdash;&nbsp;`
      + endMonth + `&nbsp;` + endDay;
  }
};

// Получение стоимости маршрута
export const getTripInfoCost = (events) => {
  const prices = events.map((eventsItem) => eventsItem.price);

  return prices.reduce((sum, current) => sum + current, 0);
};
