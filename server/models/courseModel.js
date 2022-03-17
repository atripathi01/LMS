const mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    courseCategory: {
        type: String
    },
    courseName: {
        type: String
    },
    courseCode: {
        type: String,
        unique: true
    },
    courseDescription: {
        type: String
    },
    courseCreationTime: {
        type: Date
    },
    lastUpdateTime: {
        type: Date
    },
    courseDuration: {
        type: String
    }

})

// var courseCategorySchema = new mongoose.Schema({
//     courseCategory: {
//         type: String
//     },
//     courseSubCategory: {
//         type: String
//     },
//     courseCodePrefix: {
//         type: String,
//         unique: true
//     },
//     lastIndex: {
//         type: Number,
//         default: 0
//     }
   
// });

var courseMediaSchema = new mongoose.Schema({
    mediaFileName: {
        type: String
    },
    courseCode: {
        type: String
        // unique: true
    },
    mediaUrl: { type: String },
    mediaType: { type: String }
});

mongoose.model('Courses', courseSchema);
// mongoose.model('CourseCategory', courseCategorySchema); 
mongoose.model('CourseMedia', courseMediaSchema); 