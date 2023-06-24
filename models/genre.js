const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

//Create Schema model
const Genre = mongoose.model('Genre', genreSchema);

// Make sure it is joi v13.1.0 in order to use its syntax of validate ()
function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(5).max(50).required()
    };

    return Joi.validate(genre, schema);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre; //short code if we exclude "module"
exports.validate = validateGenre;