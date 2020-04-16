// Имена фильтров
const filtersOptionNames = [`everything`, `future`, `past`];

// Генерация фильтров
export const generateFiltersOptions = () => {
  return filtersOptionNames.map((it) => {
    return {
      name: it,
      title: it.charAt(0).toUpperCase() + it.slice(1),
    };
  });
};