const mongoose = require('mongoose');

var trainerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        unique: true
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

mongoose.model('TrainerLogin', trainerSchema); //schemaname to export import here is Login
