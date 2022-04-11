
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

                // var assignmentMedia = null
                if (req.files) {

                    var getModule = await CourseSch.findOne({ courseCode: req.body.courseCode }, { modules: { $elemMatch: { _id: req.body.moduleId } } });
                    console.log("sfvgf", getModule);
                    var moduleName = getModule.modules[0].moduleName;

                    

                    let allFiles = [];
                    uploadedFiles = req.files.file;
                    if (uploadedFiles.length) {
                        uploadedFiles.forEach(key => {
                            let mediaFile = key;
                            mediaFile.mv(`./assesments/${req.body.courseCode}/${moduleName}/${req.body.assignmentId}/${userVerify.id}/` + mediaFile.name);

                            let mediaType = mediaFile.name.split(".")[1];
                            allFiles.push({
                                mediaFileName: mediaFile.name,
                                mediaType: mediaType
                            });
                        })
                    } else {
                        let mediaFile = req.files.file;
                        mediaFile.mv(`./assesments/${req.body.courseCode}/${moduleName}/${req.body.assignmentId}/${userVerify.id}/` + mediaFile.name);
                        let mediaType = mediaFile.name.split(".")[1];
                        allFiles.push({
                            mediaFileName: mediaFile.name,
                            mediaType: mediaType
                        })
                    }

                    var assesment = {
                        courseCode: req.body.courseCode,
                        moduleId: req.body.moduleId,
                        assignmentId: req.body.assignmentId,
                        assesmentUploads: allFiles,
                        submittedBy: userVerify.id,
                        learnerComments: req.body.comments
                    }




                }
                LearnerSch.findOneAndUpdate({ "_id": userVerify.id }, {
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
const uploadMultiFileSolution = async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {


            let allFiles = [];
            uploadedFiles = req.files.photos;
            if (uploadedFiles.length) {
                uploadedFiles.forEach(key => {
                    let photo = key;
                    photo.mv('./uploads/' + photo.name);

                    allFiles.push({
                        name: photo.name,
                        mimetype: photo.mimetype,
                        size: photo.size
                    });
                })
            } else {
                let photo = req.files.photos;
                photo.mv('./uploads/' + photo.name);

                allFiles.push({
                    name: photo.name,
                    mimetype: photo.mimetype,
                    size: photo.size
                })
            }
            res.send({
                status: true,
                message: 'Files are uploaded',
                data: allFiles
            });
        }
    } catch (err) {
        console.log("error", err);
        res.status(406).send(err);
    }
};
module.exports = {
    uploadAssignmentSolution,
    uploadMultiFileSolution
}