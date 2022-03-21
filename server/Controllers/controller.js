const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");

const fileUpload = require("express-fileupload");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// include node fs module
var fs = require('fs');

// enable files upload
router.use(
    fileUpload({
        createParentPath: true,
    })
);

//add other middleware
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(morgan("dev"));

router.use(cookieParser());

const { hashPassword, comparePassword } = require('./hashed')

//importing models

const mongoose = require('mongoose');
const LoginSch = mongoose.model('Login');
const RegistrationSch = mongoose.model('Registration');
const CourseSch = mongoose.model('Courses');
// const CourseCategorySch = mongoose.model('CourseCategory');
const CourseMediaSch = mongoose.model('CourseMedia');
const AdminSch = mongoose.model('Admin');

const { generateToken, verifyToken } = require('./jwt');


router.use(
    bodyparser.urlencoded({
        extended: true,
    })
);

router.get("/", (req, res) => {
    res.json({ msg: "hello" });
});


router.post('/admin/sign-in', async (req, res) => {
    if (req.body.email && req.body.password) {

        var checkAdmin = await AdminSch.findOne({
            $and: [{
                email: req.body.email
            },
            {
                password: req.body.password
            }]
        });
        if (checkAdmin) {
            // const password = await comparePassword(req.body.password, checkAdmin.password)
            // console.log(password);
            // if (password) {

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
            // } else {
            //     res.status(406).json({
            //         msg: "login failed"
            //     })
            // }

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
})

router.post('/admin/member-register', async (req, res) => {
    try {
        const userVerify = await verifyToken(req, res);
        var loginName = userVerify.name;
        var role = userVerify.role;

        console.log('user verify->', loginName, role)
        if (userVerify && userVerify.role === 'Admin') {
            if (req.body.email) {
                var checkExistingUser = await RegistrationSch.findOne({
                    email: req.body.email
                });

                if (checkExistingUser) {
                    res.status(406).json({
                        response: false,
                        msg: "Email is taken."
                    })
                } else {
                    const password = (await hashPassword(req.body.password)).toString()
                    const NewRegistration = new RegistrationSch({
                        name: req.body.name,
                        email: req.body.email,
                        password: password,
                        registrationDate: new Date(Date.now()),
                        role: req.body.role
                    });

                    NewRegistration.save(function (err) {
                        if (err) {
                            console.log(err);
                            res.status(406).json({
                                response: false,
                                error: err
                            })
                        } else {
                            res.status(200).json({
                                response: true,
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

})

router.post('/sign-in', async (req, res) => {
    if (req.body.email && req.body.password) {

        var checkExistingUser = await RegistrationSch.findOne({
            email: req.body.email
        });
        if (checkExistingUser) {
            const password = await comparePassword(req.body.password, checkExistingUser.password)
            console.log(password);
            if (password) {

                var login = {
                    loginId: checkExistingUser['_id'],
                    loginName: checkExistingUser['name'],
                    loginRole: checkExistingUser['role']
                }

                const jwttoken = await generateToken(req, res, login);
                console.log('fevefvefvefsv');
                console.log(jwttoken);
                res.status(200).json({
                    msg: "login successful",
                    name: checkExistingUser.name,
                    role: checkExistingUser.role,
                    token: jwttoken
                })
            } else {
                res.status(406).json({
                    msg: "login failed"
                })
            }

        } else {
            res.status(406).json({
                msg: "invalid email id"
            })
        }

    } else {
        res.status(406).json({
            response: "invalid input"
        })
    }
})

router.get('/admin/get-all-members', async (req, res) => {
    try {
        const userVerify = await verifyToken(req, res);
        var loginName = userVerify.name;
        var role = userVerify.role;

        console.log('user verify->', loginName, role)
        if (userVerify && userVerify.role === 'Admin') {

            var checkExistingUser = await RegistrationSch.find();

            if (!checkExistingUser) {
                res.status(406).json({
                    response: false,
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
})


router.get('/admin/get-all-trainers', async (req, res) => {
    try {
        const userVerify = await verifyToken(req, res);
        var loginName = userVerify.name;
        var role = userVerify.role;

        console.log('user verify->', loginName, role)
        if (userVerify && userVerify.role === 'Admin') {

            var checkExistingTrainers = await RegistrationSch.find({ role: 'Trainer' });
            console.log(checkExistingTrainers.length);
            if (!checkExistingTrainers.length) {
                res.status(406).json({
                    response: false,
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
})


router.get('/admin/get-all-learners', async (req, res) => {
    try {
        const userVerify = await verifyToken(req, res);
        var loginName = userVerify.name;
        var role = userVerify.role;

        console.log('user verify->', loginName, role)
        if (userVerify && userVerify.role === 'Admin') {

            var checkExistingLearners = await RegistrationSch.find({ role: 'Learner' });

            if (!checkExistingLearners.length) {
                res.status(406).json({
                    response: false,
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

});


router.post('/admin/create-course', async (req, res) => {
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
                    courseCode: req.body.courseCode,
                    courseDescription: req.body.description,
                    courseCreationTime: new Date(Date.now()),
                    courseDuration: req.body.duration
                });

                NewCourse.save(function (err, data) {
                    if (err) {
                        console.log(err);
                        res.status(406).json({
                            response: false,
                            error: err
                        })
                    } else {
                        console.log(data);
                        res.status(200).json({
                            response: true,
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
                response: "Admin not verified"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.toString()
        })
    }
});

router.post('/admin/update-course/:code', async (req, res) => {
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
                            response: false,
                            error: err
                        })
                    } else {

                        console.log("fwdveeeeeeeeeeeeeeeeeeeeeeeee");
                        console.log(data);
                        res.status(200).json({
                            response: true,
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
});

router.post('/admin/delete-course/:code', async (req, res) => {
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
});

router.get('/all-courses', async (req, res) => {
    try {
        console.log('aaaaaa');
        const userVerify = await verifyToken(req, res);
        var loginName = userVerify.name;
        var role = userVerify.role;
        console.log(userVerify)
        console.log('user verify->', loginName, role)
        if (userVerify) {
            var checkExistingCourse = await CourseSch.find();
            console.log("vedfvefsdvedf", checkExistingCourse);
            if (!checkExistingCourse.length) {
                console.log("no course exist");
                res.status(406).json({
                    msg: "No course exist"
                });
            } else {
                console.log("529");
                console.log(checkExistingCourse);
                console.log("5300");
                res.status(200).json({
                    response: true,
                    msg: "Course found",
                    course: checkExistingCourse
                    // courseCode: data.courseCode
                })

            }



        } else {
            console.log('User not verified');
            res.status(406).json({
                response: "User not verified"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.toString()
        })
    }
});

router.post('/get-course-by-course-code', async (req, res) => {
    try {
        if (req.body.courseCode) {
            console.log('aaaaaa');
            const userVerify = await verifyToken(req, res);
            var loginName = userVerify.name;
            var role = userVerify.role;
            console.log(userVerify)
            console.log('user verify->', loginName, role)
            if (userVerify) {
                var checkExistingCourse = await CourseSch.findOne({ courseCode: req.body.courseCode });
                console.log("vedfvefsdvedf", checkExistingCourse);
                if (!checkExistingCourse) {
                    console.log("no course exist");
                    res.status(406).json({
                        msg: "No course exist with given course code"
                    });
                } else {

                    console.log(checkExistingCourse);
                    res.status(200).json({
                        response: true,
                        msg: "Course found",
                        course: checkExistingCourse
                        // courseCode: data.courseCode
                    })

                }



            } else {
                console.log('User not verified');
                res.status(406).json({
                    response: "User not verified"
                })
            }
        } else {
            console.log('invalid input')
            res.json({
                msg: "Invalid Input"
            })
        }


    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.toString()
        })
    }
});

router.post('/get-course-by-course-name', async (req, res) => {
    try {
        if (req.body.courseName) {
            console.log('aaaaaa');
            const userVerify = await verifyToken(req, res);
            var loginName = userVerify.name;
            var role = userVerify.role;
            console.log(userVerify)
            console.log('user verify->', loginName, role)
            if (userVerify) {
                var checkExistingCourse = await CourseSch.find({ courseName: req.body.courseName });
                console.log("vedfvefsdvedf", checkExistingCourse);
                if (!checkExistingCourse.length) {
                    console.log("no course exist");
                    res.status(406).json({
                        msg: "No course exist with given course name"
                    });
                } else {

                    console.log(checkExistingCourse);
                    res.status(200).json({
                        response: true,
                        msg: "Course found",
                        course: checkExistingCourse
                        // courseCode: data.courseCode
                    })

                }



            } else {
                console.log('User not verified');
                res.status(406).json({
                    response: "User not verified"
                })
            }
        } else {
            console.log('invalid input')
            res.json({
                msg: "Invalid Input"
            })
        }


    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.toString()
        })
    }
});

router.post('/get-course-by-course-category', async (req, res) => {
    try {
        if (req.body.courseCategory) {
            console.log('aaaaaa');
            const userVerify = await verifyToken(req, res);
            var loginName = userVerify.name;
            var role = userVerify.role;
            console.log(userVerify)
            console.log('user verify->', loginName, role)
            if (userVerify) {
                var checkExistingCourse = await CourseSch.find({ courseCategory: req.body.courseCategory });
                console.log("vedfvefsdvedf", checkExistingCourse);
                if (!checkExistingCourse.length) {
                    console.log("no course exist");
                    res.status(406).json({
                        msg: "No course exist with given course category"
                    });
                } else {

                    console.log(checkExistingCourse);
                    res.status(200).json({
                        response: true,
                        msg: "Course found",
                        course: checkExistingCourse
                        // courseCode: data.courseCode
                    })

                }



            } else {
                console.log('User not verified');
                res.status(406).json({
                    response: "User not verified"
                })
            }
        } else {
            console.log('invalid input')
            res.json({
                msg: "Invalid Input"
            })
        }


    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.toString()
        })
    }
});

router.post('/admin/upload-course-media', async (req, res) => {
         console.log("upload");
    try {
        const userVerify = await verifyToken(req, res);
         console.log(userVerify,"user");
        if (userVerify && (userVerify.role).toLowerCase() == 'admin') {
            if (!req.files) {
                res.status(406).send({
                    status: false,
                    message: 'No file to upload'
                });
            } else {

                let mediaFile = req.files.file;
                const mediaType = mediaFile.mimetype.split('/')[1];
                const fileTypes = ['pdf', 'mp4', 'doc', 'docx']
                if (fileTypes.includes(mediaType)) {

                    var mediaSerial = 1;
                    var getCourse = await CourseMediaSch.find({ courseCode: req.body.courseCode });
                    if (getCourse.length > 0) {

                        for (let courseInfo in getCourse) {
                            let obj = getCourse[courseInfo];
                            mediaSerial = obj['mediaFileName'];
                        }
                        mediaSerial = parseInt(mediaSerial.split('_')[1].split('.')[0]) + 1;
                        console.log("mediaSerial", mediaSerial)

                    }

                    var filetype = mediaFile.mimetype.split('/')[1];    //
                    var saveFileName = `${req.body.courseCode}_${mediaSerial}.${filetype}`;

                    // mediaFile.mv('./uploads/' + mediaFile.name);  //
                    mediaFile.mv('./uploads/' + saveFileName);

                    const newCourse = new CourseMediaSch({
                        mediaFileName: saveFileName,
                        courseCode: req.body.courseCode,
                        mediaDescription: req.body.description,
                        mediaType: mediaType
                    });
                    newCourse.save();

                    uploadedFile = {
                        name: saveFileName,
                        mimetype: mediaFile.mimetype,
                        size: mediaFile.size,
                        mediaType: mediaType
                    }
                    res.status(200).send({
                        status: true,
                        message: 'File is uploaded',
                        data: {
                            courseCode: req.body.courseCode,
                            courseMedia: uploadedFile
                        }
                    });
                    console.log("uploaded")
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
        res.status(406).send(err);
    }
});

router.get('/course-media/:courseCode', async (req, res) => {

    try {
        const userVerify = await verifyToken(req, res);
        console.log(userVerify)
        if (userVerify) {

            var checkFiles = await CourseMediaSch.find({
                courseCode: req.params.courseCode
            });

            if (!checkFiles.length) {
                res.status(406).json({
                    response: false,
                    msg: "No file found"
                })
            } else {

                res.status(200).json({
                    response: true,
                    msg: "Course media found",
                    courseMedia: checkFiles
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
});


router.post('/admin/delete-course-media/:courseCode/:mediaName', async (req, res) => {

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
                    response: false,
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
                            response: true,
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
});

router.post('/admin/assign-course/:courseCode/:email', async (req, res) => {
    try {
        const userVerify = await verifyToken(req, res);
        console.log(userVerify)
        if (userVerify && userVerify.role === 'Admin') {

            var checkUser = await RegistrationSch.findOne({
                email: req.params.email
            });

            var checkCourse = await CourseSch.findOne({
                courseCode: req.params.courseCode
            });

            if (!checkUser) {
                console.log('User email not found')
                res.status(406).json({
                    response: false,
                    msg: "User email not found"
                })
            } else if(!checkCourse) {
                console.log('Course code not found')
                res.status(406).json({
                    response: false,
                    msg: "Course code not found"
                })
            } else {
                var courseAccess = await RegistrationSch.findOne({$and: [{email: req.params.email}, {courseAccess: req.params.courseCode}]})
                console.log(courseAccess)
                if(courseAccess) {
                    res.status(406).json({
                        response: false,
                        msg: "Course access already provided"
                    })
                } else {
                    RegistrationSch.findOneAndUpdate(checkUser, {$push: {courseAccess: req.params.courseCode}}, function (err, data) {
                        if (err) {
                            res.status(406).json(err)
                        } else {
                            res.status(200).json({
                                response: true,
                                msg: "Course access provided",
                                user: req.params.email,
                                course: req.params.courseCode
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
});

module.exports = router;
