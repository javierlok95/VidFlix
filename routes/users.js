const auth = require('../middleware/auth');
const jwt =require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
   const user = await User.findById(req.user._id).select('-password'); //"-" means exclude,  in this case exclude password property
   res.send(user);
});

// app.get(), app.post(), app.put(), app.delete() all these methods correspond with http verbs
//Installing nodemon as Node Monitor helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected

router.post('/', async (req, res) => {
    const { error } = validate(req.body); //{ error } is equivalent from (result.error) - object destructuring
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email:req.body.email })
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password'])); // The user object. Also we use "_" from lodash module to summarize it instead of have name "name: req.body.name", "email: req.body.email," and "password: req.body.password"
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt); //"user.password is the plain text password", so we hash it with salt and reset it
    await user.save(); // save the user to the database

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
}); // We add post for creating and registering new users

module.exports = router;