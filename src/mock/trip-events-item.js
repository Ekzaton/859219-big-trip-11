// Импорт
import {
  getRandomArrayItem,
  getRandomDateTime,
  getRandomIntegerNumber
} from "../utils.js";

// Типы точек маршрута
const EVENT_TYPES = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`
];

// Названия городов
const CITY_NAMES = [
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
const EVENT_OFFERS = [
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
    type: getRandomArrayItem(EVENT_TYPES),
    city: getRandomArrayItem(CITY_NAMES),
    start: startDateTime,
    end: endDateTime,
    price: getRandomIntegerNumber(200, 500),
    offers: getRandomOffers(EVENT_OFFERS)
  };
};

// Генерация массива точек маршрута
export const generateTripEvents = (count) => {
  return new Array(count).fill(``).map(generateTripEventsItem);
};
