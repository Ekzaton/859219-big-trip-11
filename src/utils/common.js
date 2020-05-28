// Изменение первой буквы заголовка на прописную
export const capitalize = (title) => {
  return title[0].toUpperCase() + title.slice(1);
};

// Получение пунктов назначаения
export const getEventDestinations = (data) => {
  return data.reduce((acc, item) => {
    if (acc[item.name] === undefined) {
      acc[item.name] = [];
    }
    acc[item.name] = item;
    return acc;
  }, {});
};

// Получение доп. опций
export const getEventOffers = (data) => {
  return data.reduce((acc, item) => {
    if (acc[item.type] === undefined) {
      acc[item.type] = [];
    }
    acc[item.type] = item.offers;
    return acc;
  }, {});
};
