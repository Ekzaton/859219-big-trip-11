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

// Получение случайного элемента массива
export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

// Получение случайной даты и времени
export const getRandomDateTime = () => {
  const randomDateTime = new Date();

  const diffHours = getRandomIntegerNumber(1, 6);
  const diffMinutes = getRandomIntegerNumber(15, 30);

  randomDateTime.setHours(randomDateTime.getHours() + diffHours);
  randomDateTime.setMinutes(randomDateTime.getMinutes() + diffMinutes);

  return randomDateTime;
};

// Получение случайного целого числа из заданного интервала
export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};
