
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
                            mediaFile.mv(`./assessments/${req.body.courseCode}/${moduleName}/${req.body.assignmentId}/${userVerify.id}/` + mediaFile.name);

                            let mediaType = mediaFile.name.split(".")[1];
                            allFiles.push({
                                mediaFileName: mediaFile.name,
                                mediaType: mediaType
                            });
                        })
                    } else {
                        let mediaFile = req.files.file;
                        mediaFile.mv(`./assessments/${req.body.courseCode}/${moduleName}/${req.body.assignmentId}/${userVerify.id}/` + mediaFile.name);
                        let mediaType = mediaFile.name.split(".")[1];
                        allFiles.push({
                            mediaFileName: mediaFile.name,
                            mediaType: mediaType
                        })
                    }

                    var assessment = {
                        courseCode: req.body.courseCode,
                        moduleId: req.body.moduleId,
                        assignmentId: req.body.assignmentId,
                        assessmentUploads: allFiles,
                        submittedBy: userVerify.id,
                        learnerComments: req.body.comments
                    }




                }
                LearnerSch.findOneAndUpdate({ "_id": userVerify.id }, {
                    // CourseSch.findOneAndUpdate({ courseCode: req.body.courseCode }, {
                    $push: {
                        "assessment": assessment
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


const viewAssignmentLearner = async (req, res) => {
    try {
        const userVerify = await verifyToken(req, res);
        var loginName = userVerify.name;
        var role = userVerify.role;

        console.log('user verify->', loginName, role)
        if (userVerify) {

            var checkAssignments = await LearnerSch.findOne({ _id: userVerify.id });
            checkAssignments = checkAssignments.assessment
            // console.log(checkAssignments);
            if (!checkAssignments.length) {
                res.status(406).json({
                    msg: "No assignments found."
                })
            } else {
                // console.log(checkAssignments)
                var myAssignments = checkAssignments.filter(ele => {
                    console.log(ele);
                    return (ele.courseCode == req.body.courseCode && ele.moduleId == req.body.moduleId && ele.assignmentId == req.body.assignmentId)
                })
                if (!checkAssignments.length) {
                    res.status(406).json({
                        msg: "No assignments for this assignment id found."
                    })
                } else {
                    console.log(myAssignments);
                    res.status(200).json(myAssignments);
                }
            }

        } else {
            console.log('Member not verified');
            res.status(406).json({
                response: "Member not verified"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.toString()
        })
    }
}

const viewAllAssignments = async (req, res) => {
    try {
        const userVerify = await verifyToken(req, res);
        var loginName = userVerify.name;
        var role = userVerify.role;

        console.log('user verify->', loginName, role)
        if (userVerify) {

            var checkAssignments = await LearnerSch.find({
                assessment: {
                    $elemMatch: {
                        courseCode: req.body.courseCode,
                        moduleId: req.body.moduleId,
                        assignmentId: req.body.assignmentId
                    }
                }
            });


            if (!checkAssignments.length) {
                res.status(406).json({
                    msg: "No assignments found."
                })
            } else {
                // console.log(checkAssignments)
                var allAssignments = []
                checkAssignments.forEach(elements => {
                    console.log("elements",elements.name);
                    let data = []
                    elements.assessment.forEach(assg=>{
                        // console.log(assg);
                        if (assg.courseCode == req.body.courseCode && assg.moduleId == req.body.moduleId && assg.assignmentId == req.body.assignmentId) {
                            console.log('found');
                            console.log(assg.assessmentUploads);
                            data.push(...assg.assessmentUploads)
                        }
                    })
                    if(data.length){

                        allAssignments.push({
                            uploadedById:elements._id,
                            uploadedByName:elements.name,
                            assessmentUploads:data
                        })
                    }
                    
                })
 
                // checkAssignments.forEach(elements => {
                //     console.log("elements",elements);
                    
                //     elements.assessment.forEach(assg=>{
                //         // console.log(assg);
                //         if (assg.courseCode == req.body.courseCode && assg.moduleId == req.body.moduleId && assg.assignmentId == req.body.assignmentId) {
                //             allAssignments.push(assg)
                //         }
                //     })
                    
                // })



                // console.log(allAssignments);
                if (!checkAssignments.length) {
                    res.status(406).json({
                        msg: "No assignments for this assignment id found."
                    })
                } else {
                    // console.log(myAssignments);
                    res.status(200).json(allAssignments);
                }
            }

        } else {
            console.log('Member not verified');
            res.status(406).json({
                response: "Member not verified"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.toString()
        })
    }
}

module.exports = {
    uploadAssignmentSolution,
    viewAssignmentLearner,
    viewAllAssignments
}