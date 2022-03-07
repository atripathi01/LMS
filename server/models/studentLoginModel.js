const mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    email : {
        type: String,  
        unique: true
    },
    contact: {
        type: String
    },
    interest: {
        type: String
    }
});

mongoose.model('StudentLogin', studentSchema); 