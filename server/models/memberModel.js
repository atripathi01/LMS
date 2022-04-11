const mongoose = require('mongoose');

const assgSchemas =  require('./assignmentSchema')

var courseAccessSchema = new mongoose.Schema({
    courseCode:{type:String},
    accessTill:{type:Date}
});

var learnerSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    registrationDate: { type: Date },
    role: { type: String },
    courseAccess: [courseAccessSchema],
    assessment: [assgSchemas.assessmentSchema]
}, { collection: 'members' });


var trainerSchema = new mongoose.Schema({

    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    registrationDate: { type: Date },
    role: { type: String }
}, { collection: 'members' });

mongoose.model('Learner', learnerSchema);
mongoose.model('Trainer', trainerSchema)