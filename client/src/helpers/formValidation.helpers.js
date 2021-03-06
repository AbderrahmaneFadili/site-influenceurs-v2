import validator from "validator";
//check if is empty
const isEmpty = (field) => {
  return validator.isEmpty(field);
};

//check if the email is valide
const isEmailValide = (value) => {
  return validator.isEmail(value);
};

//check if the password is valide
const isPasswordValide = (value) => {
  return value.length === 8;
};

//check the password confirmation
const isPasswordConfirmed = (password, confirmation) => {
  return password === confirmation;
};

//check the phone validation
const isPhoneValide = (string) => {
  return validator.isMobilePhone(string);
};

export {
  isEmpty,
  isEmailValide,
  isPhoneValide,
  isPasswordConfirmed,
  isPasswordValide,
};
