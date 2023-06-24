const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validate } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// app.get(), app.post(), app.put(), app.delete() all these methods correspond with http verbs
//Installing nodemon as Node Monitor helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

//Input validation Line 25-27
//Use joi
//First argument is the route "/", second is optionally the middleware, the third "async (req, res) =>" the route handler
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body); //{ error } is equivalent from (result.error) - object destructuring
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name }); //use "let" so we can reset its value
    genre = await genre.save();

    res.send(genre);
});

router.put('/:id', [auth, validateObjectId], async (req, res) => {
    const { error } = validate(req.body); //{ error } is equivalent from (result.error) - object destructuring
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    //Look up the course
    // If not existing, return 404
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    //Validate
    //If invalid, return 400 - Bad request

    //Update genre
    //genre.name = req.body.name;
    //Return the updated genre
    res.send(genre);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id)
    //Look up the course
    //Not existing, return 404
    if (!genre) return res.status(404).send('The genre with the given ID was not found');

    //Return the same genre
    res.send(genre);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

module.exports = router;