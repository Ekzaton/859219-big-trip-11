import {MONTHS} from "../const.js";

// Шаблон дня
export const createTripDaysItemTemplate = (dates) => {
  return dates.map((date, counter) => {
    const dateTime = new Date(date);

    const day = dateTime.getDate();
    const month = dateTime.getMonth();
    const year = dateTime.getYear();

    return (
      `<li class="trip-days__item day">
        <div class="day__info">
          <span class="day__counter">${counter + 1}</span>
          <time class="day__date" datetime="${year}-${month + 1}-${day}">
            ${MONTHS[month]}&nbsp;${day}
          </time>
        </div>
        <ul class="trip-events__list"></ul>
      </li>`
    );
  }).
  join(`\n`);
};
