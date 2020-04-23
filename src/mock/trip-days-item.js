// Получение дат маршрута
export const getTripDates = (events) => {
  const dates = events.map((eventsItem) => eventsItem.start.toDateString());

  return Array.from(new Set(dates));
};
