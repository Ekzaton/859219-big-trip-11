// Константы
const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;

// Установка формата даты и времени
const castDateTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

// Формат даты
export const formatDate = (value) => {
  const date = castDateTimeFormat(value.getDate());
  const month = castDateTimeFormat(value.getMonth() + 1);
  const year = castDateTimeFormat(value.getFullYear()).slice(2);

  return `${date}/${month}/${year}`;
};

// Формат времени
export const formatTime = (value) => {
  const hours = castDateTimeFormat(value.getHours());
  const minutes = castDateTimeFormat(value.getMinutes());

  return `${hours}:${minutes}`;
};

// Получение продолжительности в минутах
export const getDurationTime = (value) => {
  return value / (MSEC_IN_SEC * SEC_IN_MIN);
};

// Получение случайного элемента массива
export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

// Получение случайной даты и времени
export const getRandomDateTime = () => {
  const randomDateTime = new Date();

  const diffHours = getRandomIntegerNumber(0, 6);
  const diffMinutes = getRandomIntegerNumber(30, 60);

  randomDateTime.setHours(randomDateTime.getHours() + diffHours);
  randomDateTime.setMinutes(randomDateTime.getMinutes() + diffMinutes);

  return randomDateTime;
};

// Получение случайного целого числа из заданного интервала
export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};