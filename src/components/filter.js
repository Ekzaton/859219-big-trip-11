// Разметка одного фильтра
const createFilterMarkup = (filtersOption, isChecked) => {
  const {name, title} = filtersOption;

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${name}"
        ${isChecked ? `checked` : ``}
      >
      <label class="trip-filters__filter-label"
        for="filter-${name}"
      >
        ${title}
      </label>
    </div>`
  );
};

// Шаблон секции фильтров
export const createFilterTemplate = (filtersOptions) => {
  const filtersMarkup = filtersOptions.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">

      ${filtersMarkup}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};
