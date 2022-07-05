const twoDigits = (value) => {
  if (value < 10) return `0${value}`;
  return `${value}`;
};

export const getFileFormattedDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDay();
  return `${year}${twoDigits(month)}${twoDigits(day)}`;
};

export const formatTwoDigitTime = (time) => {
  const hours = Math.floor(time / 1000 / 60 / 60);
  const minutes = Math.floor(time / 1000 / 60) - hours * 60;
  const seconds = Math.floor(time / 1000) - hours * 60 * 60 - minutes * 60;
  return `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(seconds)}`;
};
