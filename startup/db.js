const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
    const db = config.get('db');
    mongoose.connect((db), { useNewUrlParser: true, useUnifiedTopology: true }) //Database Initialization
        .then(() => console.log(`Connected to ${db}...`)) // In real life application it is better to use debug module cause you have much control the debugging messages you want to see in the console
}
