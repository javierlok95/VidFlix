const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next){
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.') //Client doesnt have authentication

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));// To configure the token is true. Also stored it in an environment variable, we need to use the config module to read that
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid token.')
    }
}

module.exports = auth;