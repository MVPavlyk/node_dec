const express = require('express');
const {FileServices} = require('./services');
const {UserRouter} = require('./routes');

const app = express();
app.use(express.json());


app.use('/users', UserRouter);

app.use('*', (res) => {
    res.status(404).json('Page not found')
});

app.listen(5000, () => {
    console.log('Server started at port 5000');
});