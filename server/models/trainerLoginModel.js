const mongoose = require('mongoose');

var trainerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    expertise: {
        type: String
    },
    contact: {
        type: String
    },
    experience: {
        type: String
    }
});

mongoose.model('TrainerLogin', trainerSchema); 
