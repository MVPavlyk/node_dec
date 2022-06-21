const {FileServices} = require('../services');
module.exports = {
    getAll:  async (req, res) => {
        const users = await FileServices.reader();
        res.json(users);
    },

    getOne: async (req, res) => {
        const {userId} = req.params;
        const users = await FileServices.reader();

        const oneUser = users.find(user => user.id === +userId);

        if (!oneUser) {
            return res.status(400).json('nima usira');
        }

        res.json(oneUser);
    },

    sendUser: async (req, res) => {
        const {name, age} = req.body;
        if (!Number.isInteger(age) || age < 18) {
            return res.status(400).json('Age kaka');
        }
        if (!name || name.length < 3) {
            return res.status(400).json('Name kaka');
        }

        const users = await FileServices.reader();

        const newUser = {...req.body, id: users.length ? users[users.length - 1].id + 1 : 1};

        await FileServices.writer([...users, newUser]);

        res.status(201).json(newUser);
    },

    deleteUser: async (req, res) => {
        const {userId} = req.params;
        const users = await FileServices.reader();

        const oneUser = users.find(user => user.id === +userId);

        if (!oneUser) {
            return res.status(400).json('nima usira');
        }

        await FileServices.writer(users.filter(user => user.id !== +userId));

        res.status(200).json(userId);
    },

    updateUser: async (req, res) => {
        const {userId} = req.params;
        const users = await FileServices.reader();
        const {name, age} = req.body;

        if (age && (!Number.isInteger(age) || age < 18)) {
            return res.status(400).json('Age kaka');
        }
        if (name.length < 3) {
            return res.status(400).json('Name kaka');
        }

        const oneUser = users.find(user => user.id === +userId);

        const index = users.findIndex(user => user.id === +userId);

        if (!oneUser) {
            return res.status(400).json('nima usira');
        }

        if (name) {
            oneUser.name = name;
        }

        if (age) {
            oneUser.age = age;
        }

        users[index] = oneUser;

        await FileServices.writer(users);

        res.json(oneUser);
    },
};