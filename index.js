const express = require('express');
const mongoose = require('mongoose');
const {UserRouter} = require('./routes');
const {port, dataBase} = require('./config/constants');

mongoose.connect(dataBase);

const app = express();
app.use(express.json());


app.use('/users', UserRouter);

app.use('*', (res) => {
    res.status(404).json('Page not found');
});

app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            error: err.message || 'Unknown Error',
            code: err.status || 500
        });
});


app.listen(port, () => {
    console.log('Server started at port 5000');
});