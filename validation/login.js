const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data){
    let errors = {};

    //convert empty fields to an empty string so that to use validator function
    data.email = !isEmpty(data.email)?data.email:"";
    data.password = !isEmpty(data.password)?data.password:"";
    //Email validation
    if(Validator.isEmpty(data.email)){
        errors.email = "Email field is required";

    }
    // else if(!Validator.isEmpty(data.email)){
    //     errors.email = "Email is invalid";
    // }
    //Password Validation
    if(Validator.isEmpty(data.password)){
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};