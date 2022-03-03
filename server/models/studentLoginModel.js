const mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
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
    contact: {
        type: String
    },
    interest: {
        type: String
    }
});

mongoose.model('StudentLogin', studentSchema); 