const {getAll, getOne, sendUser, deleteUser, updateUser} = require('../controllers/user.controller');
const router = require('express').Router();

router.get('/', getAll);
router.get('/:userId', getOne);
router.post('/', sendUser);
router.delete('/:userId', deleteUser);
router.put('/:userId', updateUser);


module.exports = router;