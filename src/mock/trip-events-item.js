// Импорт
import {
  getRandomArrayItem,
  getRandomDateTime,
  getRandomIntegerNumber
} from "../utils.js";

// Точки маршрута
export const TYPES = [
  {
    title: `Taxi`,
    group: `transfer`
  },
  {
    title: `Bus`,
    group: `transfer`
  },
  {
    title: `Train`,
    group: `transfer`
  },
  {
    title: `Ship`,
    group: `transfer`
  },
  {
    title: `Transport`,
    group: `transfer`
  },
  {
    title: `Drive`,
    group: `transfer`
  },
  {
    title: `Flight`,
    group: `transfer`
  },
  {
    title: `Check-in`,
    group: `activity`
  },
  {
    title: `Sightseeing`,
    group: `activity`
  },
  {
    title: `Restaurant`,
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
    title: `Switch to comfort`,
    price: getRandomIntegerNumber(20, 100)
  },
  {
    type: `luggage`,
    title: `Add luggage`,
    price: getRandomIntegerNumber(20, 100)
  },
  {
    type: `meal`,
    title: `Add meal`,
    price: getRandomIntegerNumber(20, 100)
  },
  {
    type: `seats`,
    title: `Choose seats`,
    price: getRandomIntegerNumber(20, 100)
  },
  {
    type: `train`,
    title: `Travel by train`,
    price: getRandomIntegerNumber(20, 100)
  },
];

// Получение случайных доп. опций
const getRandomOffers = (offers) => {
  const randomOffers = [];

  for (let i = 0; i < getRandomIntegerNumber(0, 6); i++) {
    randomOffers.push(offers[i]);
  }

  return randomOffers;
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
    offers: getRandomOffers(OFFERS)
  };
};

// Генерация массива точек маршрута
export const generateTripEvents = (count) => {
  return new Array(count).fill(``).map(generateTripEventsItem);
};
