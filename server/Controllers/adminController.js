
const fs = require('fs');
const mongoose = require('mongoose');

const RegistrationSch = mongoose.model('Registration');
const CourseSch = mongoose.model('Courses');
const CourseMediaSch = mongoose.model('CourseMedia');
const AdminSch = mongoose.model('Admin');
const { hashPassword, comparePassword } = require('./hashed');

const { generateToken, verifyToken } = require('./jwt');

// const async = require('async');

// const { response } = require('express');

const signIn =  async (req, res) => {
    try {
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

const memberRegister= async (req, res) => {
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

};

const getAllMembers = async (req, res) => {
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
};

const getAllTrainers = async (req, res) => {
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
};

const getAllLearners = async (req, res) => {
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

const uploadCourseMedia = async (req, res) => {
    console.log("upload");
try {
   const userVerify = await verifyToken(req, res);
    console.log(userVerify,"user");
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
           // console.log("else");

           let mediaFile = req.files.file;
           console.log(mediaFile);
           const mediaType = mediaFile.mimetype.split('/')[1];
           console.log(mediaType);
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
};

const assignCourse = async (req, res) => {
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
    uploadCourseMedia,
    deleteCourseMedia,
    assignCourse
}
