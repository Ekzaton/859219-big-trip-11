// Утилиты
import {
  getRandomArrayItem,
  getRandomDateTime,
  getRandomIntegerNumber
} from "../utils/common.js";

// Точки маршрута
export const TYPES = [
  {
    name: `Taxi`,
    group: `transfer`
  },
  {
    name: `Bus`,
    group: `transfer`
  },
  {
    name: `Train`,
    group: `transfer`
  },
  {
    name: `Ship`,
    group: `transfer`
  },
  {
    name: `Transport`,
    group: `transfer`
  },
  {
    name: `Drive`,
    group: `transfer`
  },
  {
    name: `Flight`,
    group: `transfer`
  },
  {
    name: `Check-in`,
    group: `activity`
  },
  {
    name: `Sightseeing`,
    group: `activity`
  },
  {
    name: `Restaurant`,
    group: `activity`
  },
];

// Города
export const CITIES = [
  `Athens`,
  `Amsterdam`,
  `Copenhagen`,
  `Berlin`,
  `London`,
  `Moscow`,
  `Paris`,
  `Prague`,
  `Rome`,
  `Stockholm`
];

// Доп. опции
const OFFERS = [
  {
    type: `comfort`,
    name: `Switch to comfort`,
    price: getRandomIntegerNumber(20, 100)
  },
  {
    type: `luggage`,
    name: `Add luggage`,
    price: getRandomIntegerNumber(20, 100)
  },
  {
    type: `meal`,
    name: `Add meal`,
    price: getRandomIntegerNumber(20, 100)
  },
  {
    type: `seats`,
    name: `Choose seats`,
    price: getRandomIntegerNumber(20, 100)
  },
  {
    type: `train`,
    name: `Travel by train`,
    price: getRandomIntegerNumber(20, 100)
  },
];

// Предложения для описания
const SENTENCES = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

// Генерация доп. опций / описания
const generateRandomItems = (items) => {
  const randomItems = [];

  items.slice(getRandomIntegerNumber(1, 6)).forEach((item) =>
    randomItems.push(item));

  return randomItems;
};

// Генерация фотографий
const generateRandomPhotos = () => {
  const randomPhotos = [];

  for (let i = 0; i < getRandomIntegerNumber(1, 6); i++) {
    randomPhotos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return randomPhotos;
};

// Генерация одной точки маршрута
export const generateTripEventsItem = () => {
  const first = getRandomDateTime();
  const second = getRandomDateTime();

  const startDateTime = (first > second ? second : first);
  const endDateTime = (first > second ? first : second);

  return {
    type: getRandomArrayItem(TYPES),
    city: getRandomArrayItem(CITIES),
    start: startDateTime,
    end: endDateTime,
    price: getRandomIntegerNumber(200, 500),
    offers: generateRandomItems(OFFERS),
    description: generateRandomItems(SENTENCES),
    photos: generateRandomPhotos(),
  };
};

// Генерация массива точек маршрута c сортировкой от даты начала
export const generateTripEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTripEventsItem)
    .sort((a, b) => a.start > b.start ? 1 : -1);
};

// Получение массива точек маршрута, соответствующих конкретной дате
export const getEventsForDate = (events, date) => {
  return events.filter((eventsItem) =>
    eventsItem.start.toDateString() === date);
};
