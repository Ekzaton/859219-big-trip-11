// Шаблон дня
export const createTripDaysItemTemplate = () => {
  const counter = ``;
  const date = `2019-03-18`;
  const date2 = `MAR 18`;

  return (
    `<li class="trip-days__item day">
      <div class="day__info">
        <span class="day__counter">${counter + 1}</span>
        <time class="day__date" datetime="${date}">${date2}</time>
      </div>
      <ul class="trip-events__list"></ul>
    </li>`
  );
};
