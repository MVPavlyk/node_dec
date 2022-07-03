const {getAll, getOne, sendUser, deleteUser, updateUser} = require('../controllers/user.controller');
const {CommonMiddleware, UserMiddleware, AuthMiddleware} = require('../middlewares');
const {checkAccessTokens} = require('../middlewares/auth.middleware');
const router = require('express').Router();

router.get('/', UserMiddleware.isQueryValid, getAll);
router.post('/', UserMiddleware.isUserValid, sendUser);
router.get('/:id', CommonMiddleware.isIdValid, UserMiddleware.isUserPresent, AuthMiddleware.checkAccessTokens, getOne);
router.delete('/:id', CommonMiddleware.isIdValid, UserMiddleware.isUserPresent, deleteUser);
router.put('/:id', CommonMiddleware.isIdValid, UserMiddleware.isUserPresent, UserMiddleware.isUserValidForUpdate, updateUser);


module.exports = router;