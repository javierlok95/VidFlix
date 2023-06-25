const winston = require('winston');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();

//Single responsibility Principle in Practice
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

//PORT an environment variable is basically a variable that is part of the environment in which a process runs. Its value is set outside this application
//Proper Way to assign your port in your application
const port = process.env.PORT || 3000;

mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const server = connectDB().then(() => {
    app.listen(port, () => {
        winston.info(`Listening on port ${port}...`);
    });
});

module.exports = server;