const mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    mediaFileName: {
        type: String
    },
    courseCode: {
        type: String
        // unique: true
    },
    mediaUrl: {type: String},
    mediaType: {type: String}
});

mongoose.model('Courses', courseSchema); 