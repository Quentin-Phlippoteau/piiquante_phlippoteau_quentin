const mongoose = require('mongoose');

// "thing" pour les données utilisateur
const userSchema = mongoose.Schema ({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

});

// email unique
const uniqueValidator = require('mongoose-unique-validator') ;
userSchema.plugin(uniqueValidator);



module.exports = mongoose.model('User', userSchema);

// const User = mongoose.model('User', userSchema);

// module.exports = { mongoose, User}