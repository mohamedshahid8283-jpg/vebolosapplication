export const isValidEmail = email => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
};

export const isValidPassword = password => {
  return password.length >= 6;
};

export const isValidUsername = username => {
  return username.length >= 3;
};

export const isValidMessage = message => {
  return message.trim().length > 0;
};

export const isValidPhone = phone => {
  const regex = /^[0-9]{10}$/;

  return regex.test(phone);
};
