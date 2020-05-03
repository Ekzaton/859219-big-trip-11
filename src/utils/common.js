// Константы
import {MONTHS} from "../const.js";

const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;

// Установка формата даты и времени
const castDateTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

// Формат даты
export const formatDate = (value) => {
  const day = castDateTimeFormat(value.getDate());
  const month = castDateTimeFormat(value.getMonth() + 1);
  const year = castDateTimeFormat(value.getFullYear()).slice(2);

  return `${day}/${month}/${year}`;
};

// Формат времени
export const formatTime = (value) => {
  const hours = castDateTimeFormat(value.getHours());
  const minutes = castDateTimeFormat(value.getMinutes());

  return `${hours}:${minutes}`;
};

// Получение продолжительности в минутах
export const getDurationTime = (value) => {
  return Math.round(value / (MSEC_IN_SEC * SEC_IN_MIN));
};

// Получение случайного элемента массива
export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

// Получение случайной даты и времени
export const getRandomDateTime = () => {
  const randomDateTime = new Date();

  const diffDay = getRandomIntegerNumber(0, 7);
  const diffHours = getRandomIntegerNumber(0, 24);
  const diffMinutes = getRandomIntegerNumber(0, 60);

  randomDateTime.setDate(randomDateTime.getDate() + diffDay);
  randomDateTime.setHours(randomDateTime.getHours() + diffHours);
  randomDateTime.setMinutes(randomDateTime.getMinutes() + diffMinutes);

  return randomDateTime;
};

// Получение случайного целого числа из заданного интервала
export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

// Получение заголовка маршрута
export const getTripInfoTitle = (events) => {
  const cities = events.map((eventsItem) => eventsItem.city);

  if (cities.length <= 3) {
    return cities.map((city) => city).join(`&nbsp;&mdash;&nbsp;`);
  } else {
    return cities[0]
      + `&nbsp;&mdash;&nbsp;&hellip;&nbsp;&mdash;&nbsp;`
      + cities[cities.length - 1];
  }
};

// Получение дат маршрута
export const getTripInfoDates = (events) => {
  const start = events.map((eventsItem) => eventsItem.start);
  const end = events.map((eventsItem) => eventsItem.end);

  const startMonth = (start[0] === undefined) ? `` : MONTHS[start[0].getMonth()];
  const startDay = (start[0] === undefined) ? `` : start[0].getDate();

  const endMonth = (start[0] === undefined) ? `` : MONTHS[end[end.length - 1].getMonth()];
  const endDay = (start[0] === undefined) ? `` : end[end.length - 1].getDate();

  if (start[0] === undefined) {
    return ``;
  } else if (startMonth === endMonth) {
    return startMonth + `&nbsp;` + castDateTimeFormat(startDay)
      + `&nbsp;&mdash;&nbsp;` + castDateTimeFormat(endDay);
  } else {
    return startMonth + `&nbsp;` + castDateTimeFormat(startDay)
      + `&nbsp;&mdash;&nbsp;` + endMonth + `&nbsp;` + castDateTimeFormat(endDay);
  }
};

// Получение стоимости маршрута
export const getTripInfoCost = (events) => {
  const prices = events.map((eventsItem) => eventsItem.price);

  return prices.reduce((sum, current) => sum + current, 0);
};
