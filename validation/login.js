const Validator = require('validator');
const validText = require('./valid-text')

module.exports =  (data) => {
    let errors = {};

    email = validText(data.email) ? data.email : '';
    password = validText(data.password) ? data.password : '';


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
    
      return {
        errors,
        isValid : Object.keys(errors).length === 0
      }
}