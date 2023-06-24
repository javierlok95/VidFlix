const { User } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('user.generateAuthToken', () => {
    it('should return a valid JWT', () => {
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        };
        const user = new User(payload);
        const token = user.generateAuthToken();//When we call the jwt library will convert this "ObjectId" to a hexadecimal string to store it in the payload of the token
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(payload);// To ensure that decoded json token matches this payload
    });
});