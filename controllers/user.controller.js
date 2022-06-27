const {UserService} = require('../services');
const {hashPassword} = require('../services/password.service');
const {userPresenter} = require('../presenters/user.presenter');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const users = await UserService.findAll(req.query);
            let usersForResponse = [];
            for (const user of users) {
                usersForResponse.push(userPresenter(user));
            }
            res.json(usersForResponse);
        } catch (e) {
            next(e);
        }

    },

    getOne: async (req, res, next) => {
        try {
            const {user} = req;
            const userForResponse = userPresenter(user);
            res.json(userForResponse).status(200);
        } catch (e) {
            next(e);
        }
    },

    sendUser: async (req, res, next) => {
        try {
            const hash = await hashPassword(req.body.password);
            const user = await UserService.createOne({...req.body, password: hash});
            const newUser = userPresenter(user);

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