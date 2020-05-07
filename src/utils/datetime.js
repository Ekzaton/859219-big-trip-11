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
  const duration = moment.duration(start - end);

  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  return (
    `${days ? `${castDateTimeFormat(days)}D` : ``}
      ${hours ? `${castDateTimeFormat(hours)}H` : ``}
      ${minutes ? `${castDateTimeFormat(minutes)}M` : ``}`
  );
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
