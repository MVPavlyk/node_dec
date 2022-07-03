const {generateAuthTokens} = require('../services/token.service');
const {comparePassword} = require('../services/password.service');
const {OAuth} = require('../data');
const {userPresenter} = require('../presenters/user.presenter');
module.exports = {
    login: async (req, res, next) => {
        try {
            const {password: hashPassword, _id} = req.user;

            const {password} = req.body;

            const isPasswordCorrect = await comparePassword(hashPassword, password);

            const tokens = generateAuthTokens();

            if (isPasswordCorrect) {
                await OAuth.create({
                    userId: _id,
                    ...tokens
                });

                res.json({
                    user: userPresenter(req.user),
                    ...tokens
                });

            } else {
                res.status(404).json('User not found');
            }
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {userId, refresh_token} = req.tokenInfo;

            await OAuth.deleteOne({refresh_token});

            const tokens = generateAuthTokens();

            await OAuth.create({userId, ...tokens});

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },

};