const winston = require('winston');
const express = require('express');
const app = express();

//Single responsibility Principle in Practice
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

//PORT an environment variable is basically a variable that is part of the environment in which a process runs. Its value is set outside this application
//Proper Way to assign your port in your application
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    winston.info(`Listening on port ${port}...`);
});

module.exports = server;