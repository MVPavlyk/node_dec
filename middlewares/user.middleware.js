const {CustomError} = require('../errors');
const {UserService} = require('../services');
const {createUserValidator, updateUserValidator} = require('../validators/user.validator');
const {queryValidator} = require('../validators/query.validator');

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const {id} = req.params;

            const user = await UserService.findOne({_id: id});

            if (!user) {
                return next(new CustomError('User not found', 400));
            }

            req.user = user;

            next();
        } catch (e) {
            next(new CustomError('User not exist'));
        }
    },

    isUserValid: async (req, res, next) => {
        try {
            const {error, value} = createUserValidator.validate(req.body)

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            req.body = value

            next();
        } catch (e) {
            next(new CustomError('User not valid'));
        }
    },

    isUserValidForUpdate: async (req, res, next) => {
        try {
            const {error, value} = updateUserValidator.validate(req.body)

            if (error) {
                return next(new CustomError(error.details[0].message));
            }
            req.body = value

            next();
        } catch (e) {
            next(new CustomError('User not valid'));
        }
    },

    isQueryValid: async (req, res, next) => {
        try {
            const {error, value} = queryValidator.validate(req.query)

            if (error) {
                return next(new CustomError(error.details[0].message));
            }
            req.query = value

            next();
        } catch (e) {
            next(new CustomError('Query not valid'));
        }
    }

};
