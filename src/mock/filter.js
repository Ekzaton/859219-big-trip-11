// Имена фильтров
const filterNames = [`everything`, `future`, `past`];

// Генерация фильтров
export const generateFilters = () => {
  return filterNames.map((it) => {
    return {
      name: it,
      title: it.charAt(0).toUpperCase() + it.slice(1),
    };
  });
};
