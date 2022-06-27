const {getAll, getOne, sendUser, deleteUser, updateUser} = require('../controllers/user.controller');
const {CommonMiddleware, UserMiddleware} = require('../middlewares');
const router = require('express').Router();

router.get('/', UserMiddleware.isQueryValid, getAll);
router.post('/', UserMiddleware.isUserValid, sendUser);
router.get('/:id', CommonMiddleware.isIdValid, UserMiddleware.isUserPresent, getOne);
router.delete('/:id', CommonMiddleware.isIdValid, UserMiddleware.isUserPresent, deleteUser);
router.put('/:id', CommonMiddleware.isIdValid, UserMiddleware.isUserPresent, UserMiddleware.isUserValidForUpdate, updateUser);


module.exports = router;