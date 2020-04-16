// Имена фильтров
const sortOptionNames = [`event`, `time`, `price`];

// Генерация фильтров
export const generateSortOptions = () => {
  return sortOptionNames.map((it) => {
    return {
      name: it,
      title: it.charAt(0).toUpperCase() + it.slice(1),
    };
  });
};
