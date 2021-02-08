const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.fisrtName = !isEmpty(data.fisrtName) ? data.fisrtName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.numberPhone = !isEmpty(data.numberPhone) ? data.numberPhone : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
// userName checks
  if (Validator.isEmpty(data.userName)) {
    errors.userName = "Name field is required";
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "Name field is required";
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Name field is required";
  }
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.numberPhone)) {
    errors.numberPhone = "numberPhone field is required";
  } else if (!Validator.isNumeric(data.numberPhone)) {
    errors.numberPhone = "numberPhone is invalid";
  }else if (!Validator.isLength(data.numberPhone, { min: 12, max: 12 })) {
    errors.numberPhone = "numberPhone is must be true";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};