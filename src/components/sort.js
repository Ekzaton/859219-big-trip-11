// Разметка одной опции сортировки
const createSortMarkup = (sortOption, isChecked) => {
  const {name, title} = sortOption;

  return (
    `<div class="trip-sort__item  trip-sort__item--${name}">
      <input id="sort-${name}"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${name}"
        ${isChecked ? `checked` : ``}
      >
      <label class="trip-sort__btn"
        for="sort-${name}"
      >
        ${title}
      </label>
    </div>`
  );
};

// Шаблон секции сортировки
export const createSortTemplate = (sortOptions) => {
  const sortMarkup = sortOptions.map((it, i) => createSortMarkup(it, i === 0)).join(`\n`);

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>

      ${sortMarkup}

      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};
