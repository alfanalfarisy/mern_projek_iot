const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateKlinikSiteInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.id = !isEmpty(data.id) ? data.id : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.lat = !isEmpty(data.lat) ? data.lat : "";
  data.lng = !isEmpty(data.lng) ? data.lng : "";
// Email checks
  if (Validator.isEmpty(data.id)) {
    errors.id = "id field is required";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = "Name field is required";
  }
  if (Validator.isEmpty(data.lat)) {
    errors.lat = "lat field is required";
  } else if (!Validator.isNumeric(data.lat)) {
    errors.lat = "lat is invalid";
  }
  if (Validator.isEmpty(data.lng)) {
    errors.lng = "lng field is required";
  } else if (!Validator.isNumeric(data.lng)) {
    errors.lng = "lng is invalid";
  }
  
return {
    errors,
    isValid: isEmpty(errors)
  };
};