// Утилиты
import {getRandomIntegerNumber} from "../utils/common.js";

// Библиотеки
import moment from "moment";

// Установка формата даты и времени
export const castDateTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

// Получение даты и времени
export const getDateTime = (dateTime) => {
  return moment(dateTime).format(`DD/MM/YY HH:mm`);
};

// Получение даты
export const getDate = (date) => {
  return moment(date).format(`YYYY-MM-DD`);
};

// Получение времени
export const getTime = (time) => {
  return moment(time).format(`HH:mm`);
};

// Получение продолжительности
export const getDuration = (start, end) => {
  return moment.duration(moment(end).diff(moment(start)));
};

// Получение случайной даты и времени
export const getRandomDateTime = () => {
  const randomDateTime = new Date();

  const diffDay = getRandomIntegerNumber(-5, 5);
  const diffHours = getRandomIntegerNumber(0, 12);
  const diffMinutes = getRandomIntegerNumber(0, 30);

  randomDateTime.setDate(randomDateTime.getDate() + diffDay);
  randomDateTime.setHours(randomDateTime.getHours() + diffHours);
  randomDateTime.setMinutes(randomDateTime.getMinutes() + diffMinutes);

  return randomDateTime;
};
