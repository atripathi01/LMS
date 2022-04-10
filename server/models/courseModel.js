const mongoose = require('mongoose');

const assgSchemas = require('./assignmentSchema');

const mediaFileSchema = require('./mediaFileSchema')

var moduleSchema = new mongoose.Schema({
    moduleSerial: { type: String },
    moduleName: { type: String },
    moduleDuration: { type: String },
    moduleAssignment: [assgSchemas.assignmentSchema],
    moduleMedia: [mediaFileSchema]
});

var courseSchema = new mongoose.Schema({
    courseCategory: { type: String },
    subCategory: { type: String },
    courseName: { type: String },
    courseCode: { type: String },
    hierarchy: { type: String, default: 'General' },
    courseDescription: { type: String },
    courseCreationTime: { type: Date, default: Date.now() },
    courseDuration: { type: String },
    modules: [moduleSchema],
    assignment: [assgSchemas.assignmentSchema]

}, { collection: 'courses' });

mongoose.model('Courses', courseSchema);

