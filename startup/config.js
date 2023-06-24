const config = require('config');

module.exports = function () {
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.'); // Practice to always throw error objects instead of strings, when you throw an error obkject the stack trace will be available for you to see later.
    }
}