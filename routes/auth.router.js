const {login, refresh} = require('../controllers/auth.controller');
const {isUserExistForAuth} = require('../middlewares/user.middleware');
const {checkRefreshTokens} = require('../middlewares/auth.middleware');

const authRouter = require('express').Router();

authRouter.post('/login', isUserExistForAuth, login);
authRouter.post('/refresh', checkRefreshTokens, refresh);

module.exports = authRouter;

