// Импорт
import {
  getTripInfoTitle,
  getTripInfoDates,
  getTripInfoCost
} from "../mock/trip-info.js";

// Шаблон информации о маршруте
export const createTripInfoTemplate = (events) => {
  const title = getTripInfoTitle(events);
  const dates = getTripInfoDates(events);
  const cost = getTripInfoCost(events);

  return (
    `<section class="trip-main__trip-info trip-info">
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
