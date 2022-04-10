const mongoose = require('mongoose');
const mediaFileSchema = require('./mediaFileSchema')

var assesmentSchema = new mongoose.Schema({
    courseCode: { type: String },
    moduleId: { type: String },
    assignmentId: { type: String },
    assesmentUploads: [mediaFileSchema],
    marksObtained: { type: Number },
    submittedBy:{type:String},
    learnerComments: { type: String },
    trainerFeedback: {type:String}
});

var assignmentSchema = new mongoose.Schema({
    assignmentName: { type: String },
    totalMarks: { type: Number },
    uploadedOn: { type: Date, default: Date.now() },
    uploadedBy: { type: String },
    submitBefore: { type: Date },
    assignmentMedia: mediaFileSchema,
    remarks: { type: String }
});

module.exports = { assesmentSchema, assignmentSchema }
