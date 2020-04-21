// Получение заголовка маршрута
export const getTripTitle = (events) => {
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
export const getTripDates = (events) => {
  const dates = events.map((eventsItem) => eventsItem.start.toDateString());

  return dates[0].slice(4, 10)
    + `&nbsp;&mdash;&nbsp;`
    + dates[dates.length - 1].slice(8, 10);
};

// Получение стоимости маршрута
export const getTripCost = (events) => {
  const prices = events.map((eventsItem) => eventsItem.price);

  return prices.reduce((sum, current) => sum + current, 0);
};
