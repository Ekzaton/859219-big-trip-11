// Изменение первой буквы заголовка на прописную
export const capitalize = (title) => {
  return title[0].toUpperCase() + title.slice(1);
};

// Получение пунктов назначаения
export const getDestinations = (data) => {
  return data.reduce((acc, item) => {
    if (acc[item.name] === undefined) {
      acc[item.name] = [];
    }
    acc[item.name] = item;
    return acc;
  }, {});
};

// Получение доп. опций
export const getOffers = (data) => {
  return data.reduce((acc, item) => {
    if (acc[item.type] === undefined) {
      acc[item.type] = [];
    }
    acc[item.type] = item.offers;
    return acc;
  }, {});
};

// Плейсхолдеры для типов точки маршрута
export const TypePlaceholder = {
  'taxi': `to`,
  'bus': `to`,
  'train': `to`,
  'ship': `to`,
  'transport': `to`,
  'drive': `to`,
  'flight': `to`,
  'check-in': `in`,
  'sightseeing': `in`,
  'restaurant': `in`
};
