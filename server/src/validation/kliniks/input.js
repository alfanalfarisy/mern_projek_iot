const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateKlinikSiteInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.id = !isEmpty(data.id) ? data.id : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.owner = !isEmpty(data.owner) ? data.owner : "";
  // data.loc = !isEmpty(data.loc) ? data.loc : "";
// Email checks
  if (Validator.isEmpty(data.id)) {
    errors.id = "id field is required";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(data.owner)) {
    errors.owner = "Name field is required";
  }
  // if (Validator.isEmpty(data.loc[0])) {
  //   errors.loc = "loc field is required";
  // } else if (!Validator.isNumeric(data.loc[0])) {
  //   errors.loc = "loc is invalid";
  // }
  // if (Validator.isEmpty(data.loc[1])) {
  //   errors.loc = "loc field is required";
  // } else if (!Validator.isNumeric(data.loc[1])) {
  //   errors.loc = "loc is invalid";
  // }
  
return {
    errors,
    isValid: isEmpty(errors)
  };
};