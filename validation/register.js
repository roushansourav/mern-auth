const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data){
    let errors = {};
    data.name = !isEmpty(data.name)?data.name:"";
    data.email = !isEmpty(data.email)?data.email:"";
    data.password = !isEmpty(data.password)?data.password:"";
    data.password2 = !isEmpty(data.password2)?data.password2:"";
    data.address = !isEmpty(data.address)? data.address:"";

    if(Validator.isEmpty(data.name)){
        errors.name = "Name field is required";
    }

    if(Validator.isEmpty(data.email)){
        errors.email = 'Email fiels is required';
        

    }
    // else if(!Validator.isEmpty(data.email)){
    //     errors.email = 'Email is invalid';
    // }
    //Password checks
    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field is required';
    }
    if(Validator.isEmpty(data.password)){
        errors.password = 'Confirm Password field is required';
    }
    if(!Validator.isLength(data.password,{min:6, max:30})){
        errors.password2 = 'Password must match';
    }
    if(!Validator.isLength(data.address,{min:10,max:80})){
        errors.address = 'Address is not valid';
    }
    if(Validator.isEmpty(data.address)){
        errors.address = 'Address is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};``