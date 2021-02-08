const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateScheduleInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.doctor = !isEmpty(data.doctor) ? data.doctor : "";
  data.datetime = !isEmpty(data.datetime) ? data.datetime : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.report = !isEmpty(data.report) ? data.report : "";
// userName checks
  if (Validator.isEmpty(data.userName)) {
    errors.userName = "name field is required";
  }
  if (Validator.isEmpty(data.doctor)) {
    errors.doctor = "name field is required";
  }
  if (Validator.isEmpty(data.datetime)) {
    errors.datetime = "name field is required";
  }
  if (Validator.isEmpty(data.location)) {
    errors.location = "location field is required";
  }
  if (Validator.isEmpty(data.report)) {
    errors.report = "report field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};