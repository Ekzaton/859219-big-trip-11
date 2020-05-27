// Библиотеки
import moment from "moment";

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

// Получение дня и месяца
export const getDayMonth = (date) => {
  return moment(date).format(`MMM DD`);
};

// Получение продолжительности
export const getDuration = (start, end) => {
  return moment.duration(moment(end).diff(moment(start)));
};
