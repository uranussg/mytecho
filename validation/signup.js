const Validator = require('validator');
const validText = require('./valid-text')

module.exports =  (data) => {
    let errors = {};

    email = validText(data.email) ? data.email : '';
    password = validText(data.password) ? data.password : '';
    password2 = validText(data.password2) ? data.password2 : '';
    console.log(email, password, password2)
    if (Validator.isEmpty(email)) {
        errors.email = 'Email field is empty'
    }

    if (!Validator.isEmail(email)) {
        errors.email = 'Email is invalid'
    }

    if (Validator.isEmpty(password)) {
        errors.password = "Password field is required";
      }
    
      if (!Validator.isLength(password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
      }
    
      if (Validator.isEmpty(password2)) {
        errors.password2 = "Confirm Password field is required";
      }
    
      if (!Validator.equals(password, password2)) {
        errors.password2 = "Passwords must match";
      }

      return {
        errors,
        isValid : Object.keys(errors).length === 0
      }
}