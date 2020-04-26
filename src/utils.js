// Константы
const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;

// Позиции для отрисовки
export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

// Установка формата даты и времени
export const castDateTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

// Создание DOM-элемента
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
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

// Отрисовка компонента
export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
