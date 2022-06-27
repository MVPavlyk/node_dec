const Joi = require('joi');

module.exports = {
    nameValidator: Joi.string().alphanum().min(2).max(20),
    ageValidator: Joi.number().min(18).max(120),
    passwordValidator: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).trim(),
    emailValidator: Joi.string().regex(/^\S+@\S+\.\S+$/).trim().lowercase()
};