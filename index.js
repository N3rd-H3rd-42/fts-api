if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI, {}, () => console.log('db conntected'));

app.use('/', routes);

app.listen(PORT, () => console.log(`app running on port ${PORT}`))

app.route('/').get((req, res) => res.json({}))
