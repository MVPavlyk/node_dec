const {CustomError} = require('../errors');
const {UserService} = require('../services');

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
            const {name, email, age, password} = req.body;

            if (!age || !Number.isInteger(age) || age < 18) {
                return next(new CustomError('Age kaka'));
            }

            if (!name || name.length < 3) {
                return next(new CustomError('Name kaka'));
            }

            if (!email || !email.includes('@')) {
                return next(new CustomError('Email kaka'));
            }

            if (!password || password.length < 6) {
                return next(new CustomError('Password kaka'));
            }
            next();
        } catch (e) {
            next(new CustomError('User not valid'));
        }
    },

    isUserValidForUpfate: async (req, res, next) => {
        try {
            const {name, email, age, password} = req.body;

            if (age && (!Number.isInteger(age) || age < 18)) {
                return next(new CustomError('Age kaka'));
            }

            if (name && name.length < 3) {
                return next(new CustomError('Name kaka'));
            }

            if (email && !email.includes('@')) {
                return next(new CustomError('Email kaka'));
            }

            if (password && password.length < 6) {
                return next(new CustomError('Password kaka'));
            }
            next();
        } catch (e) {
            next(new CustomError('User not valid'));
        }
    }

};
