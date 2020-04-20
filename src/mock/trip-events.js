import {getRandomDateTime} from "../utils.js";

// Генерация одной точки маршрута
export const generateTripEventsItem = () => {
  const firstDateTime = getRandomDateTime();
  const secondDateTime = getRandomDateTime();

  const start = (firstDateTime > secondDateTime ? secondDateTime : firstDateTime);
  const end = (firstDateTime > secondDateTime ? firstDateTime : secondDateTime);

  return {
    type: `Taxi`,
    cityName: `Amsterdam`,
    startDateTime: start,
    endDateTime: end,
    price: `20`,
    offers: null
  };
};

// Генерация массива точек маршрута
export const generateTripEvents = (count) => {
  return new Array(count).fill(``).map(generateTripEventsItem);
};
