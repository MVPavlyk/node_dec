const {UserService} = require('../services');
module.exports = {
    getAll: async (req, res, next) => {
        try {
            const users = await UserService.findAll();
            res.json(users);
        } catch (e) {
            next(e);
        }

    },

    getOne: async (req, res, next) => {
        try {
            const {user} = req;
            res.json(user).status(200);
        } catch (e) {
            next(e);
        }
    },

    sendUser: async (req, res, next) => {
        try {
            const newUser = await UserService.createOne(req.body);
            res.status(201).json(newUser);

        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {

        try {
            const {id} = req.params;
            await UserService.deleteOne({_id: id});
            res.status(204).json(id);
        } catch (e) {
            next(e);
        }

    },

    updateUser: async (req, res, next) => {
        try {
            const {id} = req.params;
            const updatedUser = await UserService.updateOne({_id: id}, req.body);

            res.status(201).json(updatedUser);
        } catch (e) {
            next(e);
        }
    },
};