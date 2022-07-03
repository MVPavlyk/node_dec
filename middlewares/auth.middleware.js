const {CustomError} = require('../errors');
const {checkToken} = require('../services/token.service');
const {OAuth} = require('../data');


module.exports = {
    checkAccessTokens: async (req, res, next) => {
        try {

            const access_token = req.get('Authorization');

            if (!access_token) {
                return next(new CustomError('Bad token', 401));
            }

            checkToken(access_token);

            const tokenInfo = await OAuth.findOne({access_token});

            if (!tokenInfo) {
                return next(new CustomError('Old token', 401));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshTokens: async (req, res, next) => {
        try {

            const refresh_token = req.get('Authorization');

            if (!refresh_token) {
                return next(new CustomError('Bad token', 401));
            }

            checkToken(refresh_token);

            const tokenInfo = await OAuth.findOne({refresh_token});

            if (!tokenInfo) {
                return next(new CustomError('Bad token', 401));
            }
            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    }
};