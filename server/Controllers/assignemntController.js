
const fs = require('fs');
const mongoose = require('mongoose');

// const conn = require('../models/db')
const LearnerSch = mongoose.model('Learner');
const TrainerSch = mongoose.model('Trainer');
const mediaFileSchema = require('../models/mediaFileSchema')
// const MemberSch = mongoose.model('members')
const CourseSch = mongoose.model('Courses');
// const CourseMediaSch = mongoose.model('CourseMedia');
const { hashPassword, comparePassword } = require('./hashed');

const { generateToken, verifyToken } = require('./jwt');

const uploadAssignmentSolution = async (req, res) => {
    try {
        const userVerify = await verifyToken(req, res);
        var loginName = userVerify.name;
        var role = userVerify.role;
        console.log(userVerify)
        console.log('user verify->', loginName, role)
        if (userVerify && userVerify.role === 'Learner') {
console.log(req.body);

            var checkExistingCourse = await CourseSch.findOne({ courseCode: req.body.courseCode, "modules._id": req.body.moduleId, "modules.moduleAssignment._id": req.body.assignmentId });
            console.log("vedfvefsdvedf", checkExistingCourse);
            if (!checkExistingCourse) {
                console.log("course code does not exist");
                res.status(406).json({
                    msg: "course code does not exist"
                });
            } else {

                var assignmentMedia = null
                if (req.files) {
                    console.log(req.files);
                    console.log("else");

                    let mediaFile = req.files.file;
                    // console.log(mediaFile);
                    // const mediaType = mediaFile.mimetype.split('/')[1];
                    var mediaType = mediaFile.name.split('.')[1]
                    console.log(mediaType);
                    // console.log(mediaType);
                    const fileTypes = ['pdf', 'txt', 'mp4', 'doc', 'docx', 'js', 'json', 'pptx', 'zip']
                    if (fileTypes.includes(mediaType)) {

                        
                        var getModule = await CourseSch.findOne({ courseCode: req.body.courseCode }, { modules: { $elemMatch: { _id: req.body.moduleId } } });
                        console.log("sfvgf",getModule);        
                        var moduleName = getModule.modules[0].moduleName; 
                        
                        assignmentMedia = {
                            mediaFileName: mediaFile.name,
                            mediaType: mediaType
                        }

                        var assesment = {
                            courseCode: req.body.courseCode,
                            moduleId: req.body.moduleId,
                            assignmentId: req.body.assignmentId,
                            assesmentUploads: [assignmentMedia],
                            submittedBy: userVerify.id,
                            learnerComments: req.body.comments
                        }

                        mediaFile.mv(`./assesments/${req.body.courseCode}/${moduleName}/${req.body.assignmentId}/${userVerify.id}/` + mediaFile.name);
                        // mediaFile.mv(`./assesments/` + saveFileName);

                        // res.send('fv')
                    } else {
                        res.status(406).json({
                            response: "File types acceptable: ['pdf', 'txt','mp4', 'doc', 'docx', 'js', 'json', 'pptx','zip']"
                        });
                    }

                }
                LearnerSch.findOneAndUpdate({ "_id": userVerify.id}, {
                // CourseSch.findOneAndUpdate({ courseCode: req.body.courseCode }, {
                    $push: {
                        "assesment": assesment
                    }
                }, { new: true }, function (err, data) {
                    if (err || !data) {
                        console.log(err || data);
                        res.status(406).json({
                            error: err || data
                        });
                    } else {
                        console.log(data, 'data');
                        res.status(200).json({
                            msg: "Assignment uploaded",
                            course: data
                        });
                    }
                });
            }

        } else {
            console.log('Member not verified');
            res.status(406).json({
                msg: "Member not verified"
            });
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.toString()
        });
    }
};

module.exports = {
    uploadAssignmentSolution
}