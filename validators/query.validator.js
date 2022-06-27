const Joi = require('joi');
const {nameValidator, ageValidator, emailValidator} = require('./common.validator');
module.exports = {
    queryValidator: Joi.object({
        name: nameValidator,
        age: ageValidator,
        email: emailValidator
    })
};
