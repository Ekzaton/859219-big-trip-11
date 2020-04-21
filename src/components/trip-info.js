// Импорт
import {getTripTitle, getTripDates, getTripCost} from "../mock/trip-info.js";
import {events} from "../main.js";

// Шаблон маршрута и стоимости
export const createTripInfoTemplate = () => {
  const title = getTripTitle(events);
  const dates = getTripDates(events);
  const cost = getTripCost(events);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>
        <p class="trip-info__dates">${dates}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>`
  );
};
