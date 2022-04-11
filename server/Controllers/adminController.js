
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

const signIn = async (req, res) => {
    try {
        if (req.body.email && req.body.password) {

            var checkAdmin = await LearnerSch.findOne({
                $and: [{
                    email: req.body.email
                },
                {
                    password: req.body.password
                }]
            });
            if (checkAdmin) {

                var login = {
                    loginId: checkAdmin['_id'],
                    loginName: checkAdmin['name'],
                    loginRole: checkAdmin['role']
                }

                const jwttoken = await generateToken(req, res, login);

                console.log(jwttoken);
                res.status(200).json({
                    msg: "login successful",
                    name: checkAdmin.name,
                    role: checkAdmin.role,
                    token: jwttoken
                })

            } else {
                res.status(406).json({
                    msg: "Invalid admin"
                })
            }

        } else {
            res.status(406).json({
                response: "invalid input"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(406).json(error)
    }

};

const memberRegister = async (req, res) => {
    try {
        const userVerify = await verifyToken(req, res);
        var loginName = userVerify.name;
        var role = userVerify.role;

        console.log('user verify->', loginName, role)
        if (userVerify && userVerify.role === 'Admin') {
            if (req.body.email) {
                var checkExistingUser = await LearnerSch.findOne({
                    email: req.body.email
                });

                if (checkExistingUser) {
                    res.status(406).json({

                        msg: "Email is taken."
                    })
                } else {
                    const password = (await hashPassword(req.body.password)).toString();
                    var NewRegistration;
                    if (req.body.role == 'Trainer') {
                        NewRegistration = new TrainerSch({
                            name: req.body.name,
                            email: req.body.email,
                            password: password,
                            registrationDate: new Date(Date.now()),
                            role: req.body.role
                        });
                    } else if (req.body.role == 'Learner') {
                        NewRegistration = new LearnerSch({
                            name: req.body.name,
                            email: req.body.email,
                            password: password,
                            registrationDate: new Date(Date.now()),
                            role: req.body.role

                        });
                    }


                    NewRegistration.save(function (err) {
                        if (err) {
                            console.log(err);
                            res.status(406).json({

                                error: err
                            })
                        } else {
                            res.status(200).json({

                                msg: "Member Successfully Registered",
                                name: req.body.name,
                                email: req.body.email,
                                role: req.body.role
                            })
                        }
                    });

                }
            } else {
                res.status(406).json({
                    response: "invalid input"
                })
            }
        } else {
            console.log('Admin not verified');
            res.status(406).json({
                response: "Admin not verified"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.toString()
        })
    }

};

const getAllMembers = async (req, res) => {
    try {
        const userVerify = await verifyToken(req, res);
        var loginName = userVerify.name;
        var role = userVerify.role;

        console.log('user verify->', loginName, role)
        if (userVerify && userVerify.role === 'Admin') {
            // console.log(conn.connection.json());
            // console.log(conn.connections.json());
            // var checkExistingUser = await conn.collection('members')
            var checkExistingUser = await LearnerSch.find({ role: { $ne: 'Admin' } });


            if (!checkExistingUser.length) {
                res.status(406).json({

                    msg: "No registered users found."
                })
            } else {
                console.log(checkExistingUser)
                res.status(200).json(checkExistingUser);

            }

        } else {
            console.log('Admin not verified');
            res.status(406).json({
                response: "Admin not verified"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.toString()
        })
    }
};

const getAllTrainers = async (req, res) => {
    try {
        const userVerify = await verifyToken(req, res);
        var loginName = userVerify.name;
        var role = userVerify.role;

        console.log('user verify->', loginName, role)
        if (userVerify && userVerify.role === 'Admin') {

            var checkExistingTrainers = await TrainerSch.find({ role: 'Trainer' });
            console.log(checkExistingTrainers.length);
            if (!checkExistingTrainers.length) {
                res.status(406).json({

                    msg: "No registered trainers found."
                })
            } else {
                console.log(checkExistingTrainers)
                res.status(200).json(checkExistingTrainers);

            }

        } else {
            console.log('Admin not verified');
            res.status(406).json({
                response: "Admin not verified"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.toString()
        })
    }
};

const getAllLearners = async (req, res) => {
    try {
        const userVerify = await verifyToken(req, res);
        var loginName = userVerify.name;
        var role = userVerify.role;

        console.log('user verify->', loginName, role)
        if (userVerify && userVerify.role === 'Admin') {

            var checkExistingLearners = await LearnerSch.find({ role: 'Learner' });

            if (!checkExistingLearners.length) {
                res.status(406).json({

                    msg: "No registered learners found."
                })
            } else {
                console.log(checkExistingLearners)
                res.status(200).json(checkExistingLearners);

            }

        } else {
            console.log('Admin not verified');
            res.status(406).json({
                response: "Admin not verified"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: "Authentication Error"
        })

    }

};

const createCourse = async (req, res) => {
    try {
        const userVerify = await verifyToken(req, res);
        var loginName = userVerify.name;
        var role = userVerify.role;
        console.log(userVerify)
        console.log('user verify->', loginName, role)
        if (userVerify && userVerify.role === 'Admin') {
            var checkExistingCourse = await CourseSch.findOne({ courseCode: req.body.courseCode });
            console.log("vedfvefsdvedf", checkExistingCourse);
            if (checkExistingCourse) {
                console.log("course code exist");
                res.status(406).json({
                    msg: "course code already exist"
                });
            } else {
                const NewCourse = new CourseSch({
                    courseCategory: req.body.courseCategory,
                    courseName: req.body.courseName,
                    subCategory: req.body.subCategory,
                    courseCode: req.body.courseCode,
                    hierarchy: req.body.hierarchy && req.body.hierarchy,
                    courseDescription: req.body.courseDescription,
                    courseDuration: req.body.courseDuration
                });

                NewCourse.save(function (err, data) {
                    if (err) {
                        console.log(err);
                        res.status(406).json({
                            error: err
                        })
                    } else {
                        console.log(data);
                        res.status(200).json({
                            msg: "Course Created",
                            course: data
                            // courseCode: data.courseCode
                        })
                    }
                });
            }

        } else {
            console.log('Admin not verified');
            res.status(406).json({
                msg: "Admin not verified"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.toString()
        })
    }
};

const updateCourse = async (req, res) => {
    try {
        console.log("vefv")
        console.log(req.params.code)
        const userVerify = await verifyToken(req, res);
        var loginName = userVerify.name;
        var role = userVerify.role;
        console.log(userVerify)
        console.log('user verify->', loginName, role)
        if (userVerify && userVerify.role === 'Admin') {
            var checkExistingCourse = await CourseSch.findOne({ courseCode: req.params.code });
            console.log("vedfvefsdvedf", checkExistingCourse);
            if (!checkExistingCourse) {
                console.log("course code invalid");
                res.status(406).json({
                    msg: "course code invalid"
                });
            } else {

                console.log(checkExistingCourse);
                CourseSch.updateOne({ courseCode: req.params.code }, {
                    $set: {
                        courseCategory: req.body.courseCategory ? req.body.courseCategory : checkExistingCourse.courseCategory,
                        courseName: req.body.courseName ? req.body.courseName : checkExistingCourse.courseName,
                        courseDescription: req.body.description ? req.body.description : checkExistingCourse.courseDescription,
                        lastUpdateTime: new Date(Date.now()),
                        courseDuration: req.body.duration ? req.body.duration : checkExistingCourse.courseDuration
                    }
                }, function (err, data) {
                    if (err) {
                        console.log(err);
                        res.status(406).json({
                            error: err
                        })
                    } else {

                        console.log("fwdveeeeeeeeeeeeeeeeeeeeeeeee");
                        console.log(data);
                        res.status(200).json({
                            msg: "Course Updated",
                            courseCode: req.params.code,
                            course: data
                            // courseCode: data.courseCode
                        })
                    }
                });
            }



        } else {
            console.log('Admin not verified');
            res.status(406).json({
                response: "Admin not verified"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.toString()
        })
    }
};

const deleteCourse = async (req, res) => {
    try {
        console.log("vefv")
        console.log(req.params.code)
        const userVerify = await verifyToken(req, res);
        var loginName = userVerify.name;
        var role = userVerify.role;
        console.log(userVerify)
        console.log('user verify->', loginName, role)
        if (userVerify && userVerify.role === 'Admin') {
            const checkExistingCourse = await CourseSch.findOne({ courseCode: req.params.code });

            if (checkExistingCourse) {
                CourseSch.deleteOne({ courseCode: req.params.code }, function (err, result) {
                    if (err) {
                        console.log('error deleting course', err);
                        res.status(406).json(err);
                    } else {
                        res.status(200).json({
                            msg: "Course Deleted",
                            course: result
                        })
                    }
                });
            } else {
                console.log('course not found');
                res.status(406).json({
                    msg: "course not found"
                });
            }



        } else {
            console.log('Admin not verified');
            res.status(406).json({
                response: "Admin not verified"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.toString()
        })
    }
};

const uploadModuleMedia = async (req, res) => {
    console.log("upload");
    try {
        const userVerify = await verifyToken(req, res);
        console.log(userVerify, "user");
        if (userVerify && userVerify.role == 'Admin') {
            console.log('if part');

            if (!req.files) {
                console.log('if of if');
                // console.log(req);
                res.status(406).send({
                    status: false,
                    message: 'No file to upload'
                });
            } else {
                // console.log(req.files);
                console.log("else");

                let mediaFile = req.files.file;
                // console.log(mediaFile);
                const mediaType = mediaFile.mimetype.split('/')[1];
                console.log(mediaType);
                const fileTypes = ['pdf', 'mp4', 'doc', 'docx']
                if (fileTypes.includes(mediaType)) {
                    // var x = 
                    if (await CourseSch.findOne({ courseCode: req.body.courseCode, "modules._id": req.body.moduleId })) {
                        console.log('fdsfs')
                        // var mediaSerial = 1;
                        var getCourseModule = await CourseSch.findOne({ courseCode: req.body.courseCode }, { modules: { $elemMatch: { _id: req.body.moduleId } } });
                        console.log(" \n\n")
                        console.log(getCourseModule);

                        getModuleName = getCourseModule.modules[0].moduleName.replace(" ", "")

                        console.log(getModuleName);
                        var filetype = mediaFile.mimetype.split('/')[1];

                        var mediaLength = getCourseModule.modules[0].moduleMedia.length
                        var mediaSerial = mediaLength ? (mediaLength + 1) : 1
                        console.log(mediaSerial);
                        var saveFileName = `${getModuleName}-${mediaSerial}.${filetype}`;


                        mediaFile.mv(`./uploads/${req.body.courseCode}/${getModuleName}/` + saveFileName);

                        const newMedia = {
                            mediaSerial: saveFileName,
                            mediaFileName: mediaFile.name,
                            courseCode: req.body.courseCode,
                            mediaTitle: req.body.title,
                            mediaDescription: req.body.description,
                            mediaType: mediaType
                        };

                        // console.log(getCourseModule[0].modules[0].moduleMedia);
                        CourseSch.findOneAndUpdate({ courseCode: req.body.courseCode, modules: { $elemMatch: { _id: req.body.moduleId } } }, {
                            $push: {
                                "modules.$.moduleMedia": newMedia
                            }
                        }, { new: true }, function (err, data) {
                            if (err || !data) {
                                console.log(err || data);
                                res.status(406).json({
                                    error: err || data
                                })
                            } else {
                                console.log(data, 'data');
                                res.status(200).json({
                                    msg: "Module media uploaded",
                                    course: data
                                })
                            }
                        });
                    } else {
                        console.log('Module id not found');
                        res.status(406).json({
                            msg: "Module id not found"
                        })
                    }


                    // getCourseModule.updateOne()
                    // newMedia.save(function (err) {
                    //     if (err) {
                    //         console.log(err);
                    //         throw err;
                    //     } else {
                    //         console.log('course media uploaded');
                    //     }
                    // });
                    // console.log("new media file");
                    // console.log(newMedia);


                    // res.status(200).send({
                    //     status: true,
                    //     message: 'File is uploaded',
                    //     data: {
                    //         courseCode: req.body.courseCode,
                    //         courseMedia: newMedia
                    //     }
                    // });
                    //    console.log("uploaded")
                } else {
                    res.status(406).json({
                        response: 'Only PDF, Word and MP4 files are acceptable.'
                    })
                }

            }
        } else {
            console.log("token expired/ not authenticated")
            res.status(406).json({ response: 'Not Authenticated' })
        }
    } catch (err) {
        console.log("error", err);
        res.status(406).send(err);
    }
};

const deleteCourseMedia = async (req, res) => {

    try {
        const userVerify = await verifyToken(req, res);
        console.log(userVerify)
        if (userVerify && userVerify.role === 'Admin') {

            var checkFiles = await CourseMediaSch.findOne({
                $and: [{

                    courseCode: req.params.courseCode
                }, {
                    mediaFileName: req.params.mediaName
                }
                ]
            });

            if (!checkFiles) {
                console.log('no file found')
                res.status(406).json({

                    msg: "No file found"
                })
            } else {

                // delete file named 'sample.txt'
                var filePath = './uploads/' + req.params.mediaName
                fs.unlink(filePath, function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                });
                CourseMediaSch.deleteOne(checkFiles, function (err, data) {
                    if (err) {
                        res.status(406).json(err)
                    } else {
                        res.status(200).json({

                            msg: "Course media deleted",
                            courseMedia: checkFiles
                        })
                    }
                })

            }
        } else {
            res.status(406).json({
                response: "invalid token"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            response: err
        })
    }
};

const assignCourse = async (req, res) => {
    try {
        const userVerify = await verifyToken(req, res);
        console.log(userVerify)
        if (userVerify && userVerify.role === 'Admin') {

            var checkUser = await LearnerSch.findOne({
                email: req.body.email
            });

            var checkCourse = await CourseSch.findOne({
                courseCode: req.body.courseCode
            });

            if (!checkUser) {
                console.log('User email not found')
                res.status(406).json({

                    msg: "User email not found"
                })
            } else if (!checkCourse) {
                console.log('Course code not found')
                res.status(406).json({

                    msg: "Course code not found"
                })
            } else {
                var courseAccess = await LearnerSch.findOne({ $and: [{ email: req.body.email }, { courseAccess: { $elemMatch: { courseCode: req.body.courseCode } } }] })
                console.log(courseAccess)
                if (courseAccess) {
                    res.status(406).json({

                        msg: "Course access already provided"
                    })
                } else {
                    // function add_months(dt, n) {

                    //     return new Date(dt.setMonth(dt.getMonth() + n));
                    // }

                    // dt = new Date(Date.now());
                    // console.log(dt);

                    // dt = new Date(Date.now());
                    // console.log(add_months(dt, 6));
                    var dt = new Date(Date.now())
                    dt = new Date(dt.setMonth(dt.getMonth()+6))
                    var courseAccess = {
                        courseCode: req.body.courseCode,
                        accessTill: dt
                    }

                    LearnerSch.findOneAndUpdate({ email: req.body.email }, { $push: { courseAccess: courseAccess } }, function (err, data) {
                        if (err) {
                            res.status(406).json(err)
                        } else {
                            res.status(200).json({

                                msg: "Course access provided",
                                user: req.body.email,
                                course: req.body.courseCode
                            })
                        }

                    })
                }

            }
        } else {
            res.status(406).json({
                response: "invalid token"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            response: err
        })
    }
};

const createCourseAssignment = async (req, res) => {
    try {
        const userVerify = await verifyToken(req, res);
        var loginName = userVerify.name;
        var role = userVerify.role;
        console.log(userVerify)
        console.log('user verify->', loginName, role)
        if (userVerify && userVerify.role === 'Admin') {
            // if (true) {
            var checkExistingCourse = await CourseSch.findOne({ courseCode: req.body.courseCode });
            console.log("vedfvefsdvedf", checkExistingCourse);
            if (!checkExistingCourse) {
                console.log("course code does not exist");
                res.status(406).json({
                    msg: "course code does not exist"
                });
            } else {

                var assignmentMedia = null
                if (req.files) {
                    // console.log(req.files);
                    // console.log("else");

                    let mediaFile = req.files.file;
                    // console.log(mediaFile);
                    const mediaType = mediaFile.mimetype.split('/')[1];
                    // console.log(mediaType);
                    const fileTypes = ['pdf', 'mp4', 'doc', 'docx']
                    if (fileTypes.includes(mediaType)) {


                        assignmentCount = checkExistingCourse.assignment.length;
                        console.log('assignmentCount', assignmentCount);
                        // asg = checkExistingCourse.modules[0].moduleAssignment;
                        // asg = asg[asg.length-1].assignmentMedia.mediaFileName
                        // console.log(asg);
                        var filetype = mediaFile.mimetype.split('/')[1];    //

                        var saveFileName = `${req.body.courseCode}-asg-${assignmentCount + 1}.${filetype}`;

                        assignmentMedia = {
                            mediaFileName: saveFileName,
                            mediaType: mediaType
                        }

                        mediaFile.mv(`./uploads/${req.body.courseCode}/` + saveFileName);

                    } else {
                        res.status(406).json({
                            response: 'Only PDF, Word and MP4 files are acceptable.'
                        })
                    }

                }
                // CourseSch.findOneAndUpdate({ "courseCode": req.body.courseCode, "modules._id": req.body.moduleId }, {
                CourseSch.findOneAndUpdate({ courseCode: req.body.courseCode }, {
                    $push: {
                        "assignment": {

                            assignmentName: req.body.assignmentName,
                            assignmentMedia: assignmentMedia,
                            totalMarks: req.body.totalMarks,
                            uploadedBy: req.body.uploadedBy,
                            submitBefore: new Date(req.body.submissionDate),
                            remarks: req.body.remarks
                        }
                    }
                }, { new: true }, function (err, data) {
                    if (err || !data) {
                        console.log(err || data);
                        res.status(406).json({
                            error: err || data
                        })
                    } else {
                        console.log(data, 'data');
                        res.status(200).json({
                            msg: "Module Assignment Created",
                            course: data
                        })
                    }
                });
            }

        } else {
            console.log('Admin not verified');
            res.status(406).json({
                msg: "Admin not verified"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.toString()
        })
    }
};

const createModule = async (req, res) => {
    try {
        const userVerify = await verifyToken(req, res);
        var loginName = userVerify.name;
        var role = userVerify.role;
        console.log(userVerify)
        console.log('user verify->', loginName, role)
        if (userVerify && userVerify.role === 'Admin') {
            // if (true) {
            var checkExistingCourse = await CourseSch.findOne({ courseCode: req.body.courseCode });
            // console.log("vedfvefsdvedf", checkExistingCourse);
            if (!checkExistingCourse) {
                console.log("course code does not exist");
                res.status(406).json({
                    msg: "course code does not exist"
                });
            }
            else {


                checkModuleNameExists = checkExistingCourse.modules;
                const isFound = checkModuleNameExists.some(moduleName => {
                    if (moduleName.moduleName === req.body.moduleName) {
                        return true;
                    }
                })
                console.log(checkModuleNameExists);
                // res.send('dfvfdv')
                if (isFound) {

                    res.status(406).json({
                        msg: "Module name should be unique"
                    })
                } else {

                    CourseSch.findOneAndUpdate({ courseCode: req.body.courseCode }, {
                        $push: {
                            modules: {

                                moduleName: req.body.moduleName,
                                moduleDuration: req.body.moduleDuration
                            }
                        }
                    }, { new: true }, function (err, data) {
                        if (err) {
                            console.log(err);
                            res.status(406).json({
                                error: err
                            })
                        } else {
                            // console.log(data);
                            res.status(200).json({
                                msg: "Module Created",
                                course: data
                            })
                        }
                    });
                }
            }

        } else {
            console.log('Admin not verified');
            res.status(406).json({
                msg: "Admin not verified"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.toString()
        })
    }
};

const createModuleAssignment = async (req, res) => {
    try {
        const userVerify = await verifyToken(req, res);
        var loginName = userVerify.name;
        var role = userVerify.role;
        // console.log(userVerify)
        // console.log('user verify->', loginName, role)
        if (userVerify && userVerify.role === 'Admin') {
            // if (true) {
            var checkExistingCourse = await CourseSch.findOne({ courseCode: req.body.courseCode }, { modules: { $elemMatch: { _id: req.body.moduleId } } });

            console.log("vedfvefsdvedf", checkExistingCourse.modules[0]);
            if (!checkExistingCourse) {
                console.log("module does not exist");
                res.status(406).json({
                    msg: "module does not exist"
                });
            } else {
                var assignmentMedia = null
                if (req.files) {
                    // console.log(req.files);
                    // console.log("else");

                    let mediaFile = req.files.file;
                    // console.log(mediaFile);
                    const mediaType = mediaFile.mimetype.split('/')[1];
                    // console.log(mediaType);
                    const fileTypes = ['pdf', 'mp4', 'doc', 'docx']
                    if (fileTypes.includes(mediaType)) {


                        assignmentCount = checkExistingCourse.modules[0].moduleAssignment.length;
                        console.log('assignmentCount', assignmentCount);


                        var filetype = mediaFile.mimetype.split('/')[1];    //

                        var saveFileName = `${req.body.moduleId}-asg-${assignmentCount + 1}.${filetype}`;

                        assignmentMedia = {
                            mediaFileName: saveFileName,
                            mediaType: mediaType
                        }
                        var moduleName = checkExistingCourse.modules[0].moduleName.replace(" ", "")
                        mediaFile.mv(`./uploads/${req.body.courseCode}/${moduleName}/` + saveFileName);

                    } else {
                        res.status(406).json({
                            response: 'Only PDF, Word and MP4 files are acceptable.'
                        })
                    }

                }
                // CourseSch.findOneAndUpdate({ "courseCode": req.body.courseCode, "modules._id": req.body.moduleId }, {
                CourseSch.findOneAndUpdate({ courseCode: req.body.courseCode, modules: { $elemMatch: { _id: req.body.moduleId } } }, {
                    $push: {
                        "modules.$.moduleAssignment": {

                            assignmentName: req.body.assignmentName,
                            assignmentMedia: assignmentMedia,
                            totalMarks: req.body.totalMarks,
                            uploadedBy: req.body.uploadedBy,
                            submitBefore: new Date(req.body.submissionDate),
                            remarks: req.body.remarks
                        }
                    }
                }, { new: true }, function (err, data) {
                    if (err || !data) {
                        console.log(err || data);
                        res.status(406).json({
                            error: err || data
                        })
                    } else {
                        console.log(data, 'data');
                        res.status(200).json({
                            msg: "Module Assignment Created",
                            course: data
                        })
                    }
                });

            }

        } else {
            console.log('Admin not verified');
            res.status(406).json({
                msg: "Admin not verified"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.toString()
        })
    }
};

module.exports = {
    signIn,
    memberRegister,
    getAllMembers,
    getAllTrainers,
    getAllLearners,
    createCourse,
    updateCourse,
    deleteCourse,
    uploadModuleMedia,
    deleteCourseMedia,
    assignCourse,
    createCourseAssignment,
    createModule,
    createModuleAssignment
}
