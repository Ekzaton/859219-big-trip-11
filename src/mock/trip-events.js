export const generateEventsItem = () => {
  return {};
};

export const generateEvents = (count) => {
  return new Array(count).fill(``).map(generateEventsItem);
};
