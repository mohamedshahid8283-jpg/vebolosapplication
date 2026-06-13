export const generateId = () => {
  return Date.now().toString();
};

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const capitalize = text => {
  if (!text) {
    return '';
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const getInitials = name => {
  if (!name) {
    return '';
  }

  const names = name.split(' ');

  return names
    .map(item => item[0])
    .join('')
    .toUpperCase();
};

export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const truncateText = (text, length = 25) => {
  if (!text) {
    return '';
  }

  if (text.length <= length) {
    return text;
  }

  return `${text.substring(0, length)}...`;
};
