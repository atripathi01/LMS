const mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    courseName: {
        type: String
    },
    courseCode: {
        type: String
        // unique: true
    },
    courseMedia: {type: String},
    mediaType: {type: String}
});

mongoose.model('Courses', courseSchema); 