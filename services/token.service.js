const jwt = require('jsonwebtoken');
const {CustomError} = require('../errors');

module.exports = {
    generateAuthTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, 'qweasd', {expiresIn: '1m'});
        const refresh_token = jwt.sign(payload, 'qqwwee', {expiresIn: '30d'});
        return {
            access_token,
            refresh_token
        };
    },
    checkToken: (token = '') => {
        try {
            return jwt.verify(token, 'qweasd');
        } catch (e) {
            new CustomError('No token', 401);
        }
    }
};



