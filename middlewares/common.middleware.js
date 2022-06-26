const {Types} = require('mongoose');
const {CustomError} = require('../errors');
module.exports = {
    isIdValid: (req, res, next) => {
        try {
            const {id} = req.params;
            const isValid = Types.ObjectId.isValid(id);
            if (!isValid) {
                return next(new CustomError('Id isn\'t valid', 400));
            }
            next();
        } catch (e) {
            next(e);
        }
    }

};