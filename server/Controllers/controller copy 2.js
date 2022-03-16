const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");

const fileUpload = require("express-fileupload");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

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


// router.post('/admin/upload-course-media', async (req, res) => {


//     try {
//         const userVerify = await verifyToken(req, res);


//         if (userVerify && (userVerify.role).toLowerCase() == 'admin') {
//             // console.log("verified","verif");

//             if (!req.files) {
//                 res.status(406).send({
//                     status: false,
//                     message: 'No file uploaded'
//                 });
//             } else {
                

//                 let mediaFile = req.files.file;    //
//                 const mediaType = mediaFile.mimetype.split('/')[1];
//                 const fileTypes = ['pdf', 'mp4', 'doc', 'docx']
//                 if (fileTypes.includes(mediaType)) {


//                     // let mediaFile = req.body;
//                     console.log("bb");
//                     console.log(mediaFile);
//                     // mediaFile.mv('./uploads/' + mediaFile.name);  //
//                     mediaFile.mv('./uploads/' + mediaFile.name);
//                     var filetype = mediaFile.mimetype.split('/')[1];    //
//                     var saveFileName = `${mediaFile.name}`;




//                     const newCourse = new CourseSch({
//                         mediaFileName: req.body.courseName,
//                         courseCode: req.body.courseCode,
//                         mediaUrl: mediaFile.name,
//                         mediaType: mediaType
//                     });
//                     console.log(newCourse);
//                     newCourse.save();
//                     // res.json({
//                     //     response: true,
//                     //     msg: "New Course Added",
//                     //     course: req.body.courseName,
//                     //     courseCode: req.body.courseCode
//                     // })

//                     uploadedFile = {
//                         name: mediaFile.name,
//                         mimetype: mediaFile.mimetype,
//                         size: mediaFile.size,
//                         mediaType: mediaType
//                     }
//                     res.status(200).send({
//                         status: true,
//                         message: 'File is uploaded',
//                         data: {
//                             courseName: req.body.courseName,
//                             courseCode: req.body.courseCode,
//                             courseMedia: uploadedFile
//                         }
//                     });
//                     console.log("uploaded")
//                 } else {
//                     res.status(406).json({
//                         response: 'Only PDF, Word and MP4 files are acceptable.'
//                     })
//                 }

//             }
//         } else {
//             console.log("token expired/ not authenticated")
//             res.status(406).json({ response: 'Not Authenticated' })
//         }
//     } catch (err) {
//         res.status(406).send(err);
//     }
// });


// router.post('/newStudent', async function (req, res) {

//     if (req.body.email) {
//         var checkExistingUser = await StudentSch.findOne({
//             email: req.body.email
//         });

//         if (checkExistingUser) {
//             res.status(406).json({
//                 response: false,
//                 msg: "Username is taken."
//             })
//         } else {
//             const StudentLoginList = new StudentSch({
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: req.body.password,
//                 interest: req.body.interest,
//                 contact: req.body.contact
//             });
//             StudentLoginList.save();
//             res.status(200).json({
//                 response: true,
//                 msg: "New Student ID Created",
//                 name: req.body.name
//             })
//         }
//     } else {
//         res.status(406).json({
//             response: "invalid input"
//         })
//     }

// })

// router.post('/loginStudent', async (req, res) => {

//     const unm = req.body.email;
//     const pss = req.body.password;
//     const role = req.body.role;

//     console.log(unm, pss, role);

//     if ((unm != "") && (pss != "")) {
//         var chkLogin = await StudentSch.findOne({
//             $and: [{ email: unm }, { password: pss }]
//         });

//         if (chkLogin) {
//             console.log('Login Success');


//             var login = {
//                 loginId: chkLogin['_id'],
//                 loginName: chkLogin['name'],
//                 loginRole: role
//             }

//             const jwttoken = await generateToken(req, res, login)
//             console.log(jwttoken);
//             res.status(200).json({
//                 token: jwttoken,
//                 msg: "login success"
//             });
//         } else {
//             res.status(406).json({
//                 title: "Login Error",
//                 msg: "Username or Password not correct",
//             })
//         }
//     }

// })


// router.get('/homeStudent', async (req, res) => {

//     try {
//         const userVerify = await verifyToken(req, res, 'student');
//         var loginName = userVerify.name;
//         var role = userVerify.role;

//         res.status(200).json({
//             title: "Welcome Home",
//             name: loginName,
//             role: role
//         });

//     } catch (err) {
//         console.log(err);
//         res.status(406).json({
//             msg: "Student ID not authenticated"
//         })
//     }

// })


// router.post('/newTrainer', async function (req, res) {
//     console.log("newtrainer");

//     console.log(req.body)
//     if (req.body.username) {
//         var checkExistingUser = await TrainerSch.findOne({
//             email: req.body.email
//         });


//         if (checkExistingUser) {
//             res.status(406).json({
//                 response: false,
//                 msg: "Username is taken."
//             });
//         } else {

//             const TrainerList = new TrainerSch({
//                 name: req.body.name,
//                 username: req.body.username,
//                 password: req.body.password,
//                 email: req.body.email,
//                 expertise: req.body.expertise,
//                 contact: req.body.contact,
//                 experience: req.body.experience
//             });
//             TrainerList.save();
//             res.status(200).json({
//                 response: true,
//                 msg: "New Trainer ID Created",
//                 username: req.body.username
//             })
//             console.log("saves");
//         }
//     } else {
//         res.status(406).json({
//             response: "invalid input"
//         })
//     }

// })


// router.post('/loginTrainer', async (req, res) => {

//     const unm = req.body.email;
//     const pss = req.body.password;
//     const role = req.body.role;

//     console.log(unm, pss, role);

//     if ((unm != "") && (pss != "")) {
//         var chkLogin = await TrainerSch.findOne({
//             $and: [{ email: unm }, { password: pss }]
//         });

//         if (chkLogin) {
//             console.log('Login Success');


//             var login = {
//                 loginId: chkLogin['_id'],
//                 loginName: chkLogin['name'],
//                 loginRole: role
//             }

//             const jwttoken = await generateToken(req, res, login)
//             res.status(200).json({
//                 token: jwttoken,
//                 msg: "login success"
//             });
//         } else {
//             res.status(406).json({
//                 title: "Login Error",
//                 msg: "Username or Password not correct",
//             })
//         }
//     }

// })



// router.get('/homeTrainer', async (req, res) => {

//     try {
//         const userVerify = await verifyToken(req, res, 'trainer');
//         var loginName = userVerify.name;
//         var role = userVerify.role;

//         res.status(200).json({
//             title: "Welcome Home",
//             name: loginName,
//             role: role
//         });

//     } catch (err) {
//         console.log(err);
//         res.status(406).json({
//             msg: "Trainer ID not authenticated"
//         })
//     }

// })


// router.post('/upload-one', async (req, res) => {


//     try {
//         const userVerify = await verifyToken(req, res, 'trainer');
//         // console.log(userVerify)
//         // console.log(mediaFile);
//         // console.log(req.body);
//         // console.log(req.files);
//         // console.log(req.files.formData);
//         if (userVerify.id && (userVerify.role).toLowerCase() == 'trainer') {
//             // console.log("verified","verif");

//             if (!req.files) {
//                 res.status(406).send({
//                     status: false,
//                     message: 'No file uploaded'
//                 });
//             } else {
//                 // console.log("bbb");   

//                 let mediaFile = req.files.file;    //
//                 const mediaType = mediaFile.mimetype.split('/')[1];

//                 if(mediaType == 'pdf' || mediaType == 'mp4') {


//                 // let mediaFile = req.body;
//                 console.log("bb");   
//                 console.log(mediaFile);   
//                 // mediaFile.mv('./uploads/' + mediaFile.name);  //
//                 mediaFile.mv('./uploads/' + mediaFile.name); 
//                 var filetype = mediaFile.mimetype.split('/')[1];    //
//                 var saveFileName = `${mediaFile.name}`;




//                 const newCourse = new CourseSch({
//                     courseName: req.body.courseName,
//                     courseCode: req.body.courseCode,
//                     courseMedia: mediaFile.name,
//                     mediaType: mediaType
//                 });
//             console.log(newCourse);
//                 newCourse.save();
//                 // res.json({
//                 //     response: true,
//                 //     msg: "New Course Added",
//                 //     course: req.body.courseName,
//                 //     courseCode: req.body.courseCode
//                 // })

//                 uploadedFile = {
//                     name: mediaFile.name,
//                     mimetype: mediaFile.mimetype,
//                     size: mediaFile.size,
//                     mediaType: mediaType
//                 }
//                 res.status(200).send({
//                     status: true,
//                     message: 'File is uploaded',
//                     data: {
//                         courseName: req.body.courseName,
//                         courseCode: req.body.courseCode,
//                         courseMedia: uploadedFile
//                     }
//                 });
//                 console.log("uploaded")
//                 } else {
//                     res.status(406).json({
//                         response: 'Only PDF and MP4 files are acceptable.'
//                     })
//                 }

//             }
//         } else {
//             console.log("token expired/ not authenticated")
//             res.status(406).json({ response: 'Not Authenticated' })
//         }
//     } catch (err) {
//         res.status(406).send(err);
//     }
// });


// // router.post('/upload-many', async (req, res) => {
// //     try {
// //         const userVerify = await verifyToken(req, res, 'trainer');
// //         console.log("cc",userVerify)
// //         if (userVerify.id && (userVerify.role).toLowerCase() == 'trainer') {
// //             if (!req.files) {
// //                 res.status(406).send({
// //                     status: false,
// //                     message: 'No file uploaded'
// //                 });
// //             } else {
// //                 let data = [];

// //                 //loop all files
// //                 _.forEach(_.keysIn(req.files.mediaFiles), (key) => {
// //                     let mediaFile = req.files.mediaFiles[key];

// //                     //move mediaFile to uploads directory
// //                     mediaFile.mv('./uploads/' + mediaFile.name);

// //                     //push file details
// //                     data.push({
// //                         name: mediaFile.name,
// //                         mimetype: mediaFile.mimetype,
// //                         size: mediaFile.size
// //                     });

// //                     const newCourse = new CourseSch({
// //                         courseName: req.body.courseName,
// //                         courseCode: req.body.courseCode,
// //                         courseMedia: mediaFile.name,
// //                         mediaType: mediaFile.mimetype
// //                     });
// //                     newCourse.save();

// //                 });

// //                 //return response
// //                 res.status(200).send({
// //                     status: true,
// //                     message: 'Files are uploaded',
// //                     data: data
// //                 });
// //             }
// //         } else {
// //             res.status(406).json({ response: 'Not Authenticated' })
// //         }

// //     } catch (err) {
// //         console.log(err);
// //         res.status(406).json({
// //             response: "Trainer ID not authenticated"
// //         })
// //     }


// // });

// // router.post('/add-course', async (req, res) => {
// //     if (req.body.courseName) {
// //         var checkCourse = await CourseSch.findOne({
// //             courseCode: req.body.courseCode
// //         });

// //         if (checkCourse) {
// //             res.json({
// //                 response: false,
// //                 msg: "Course Code exists"
// //             })
// //         } else {

// //             const Course = new CourseSch({
// //                 courseName: req.body.courseName,
// //                 courseCode: req.body.courseCode,
// //                 courseMedia: req.body.courseMedia
// //             });
// //             Course.save();
// //             res.json({
// //                 response: true,
// //                 msg: "New Course Added",
// //                 course: req.body.courseName,
// //                 courseCode: req.body.courseCode
// //             })
// //         }
// //     } else {
// //         res.json({
// //             response: "invalid input"
// //         })
// //     }
// // })


// // router.post('/get-file', async (req, res) => {
// //     try {
// //         const userVerify = await verifyToken(req, res, 'trainer');
// //         console.log(userVerify)
// //         if (userVerify) {
// //             // var checkFiles = await CourseSch.findOne({
// //             //     $and: [{
// //             //         courseCode: req.body.courseCode

// //             //     }, {
// //             //         courseMedia: req.body.courseMedia

// //             //     }]
// //             // });

// //             var checkFiles = await CourseSch.findOne({
// //                  courseCode: req.body.courseCode
// //             });

// //             if (!checkFiles) {
// //                 res.status(406).json({
// //                     response: false,
// //                     msg: "No such file found"
// //                 })
// //             } else {

// //                 res.status(200).json({
// //                     response: true,
// //                     msg: "Course media found",
// //                     courseName: checkFiles.courseName,
// //                     courseCode: checkFiles.courseCode,
// //                     courseMedia: checkFiles.courseMedia
// //                 })
// //             }
// //         } else {
// //             res.status(406).json({
// //                 response: "invalid input"
// //             })
// //         }

// //     } catch (err) {
// //         console.log(err);
// //         res.status(406).json({
// //             response: "Not Authenticated"
// //         })
// //     }
// // });

// router.get('/get-all-file', async (req, res) => {
//     try {


//         // const userVerify = await verifyToken(req, res, 'trainer');
//         // console.log(userVerify)
//         // if (userVerify) {
//             var checkFiles = await CourseSch.find({}).lean();


//             if (!checkFiles) {
//                 res.status(406).json({
//                     response: false,
//                     msg: "No such file found"
//                 })
//             } else {
//                 console.log(checkFiles)

//                 res.status(200).json({
//                     response: true,
//                     msg: "Course media found",
//                     mediaData : checkFiles
//                 })
//             }
//         // } else {
//         //     res.status(406).json({
//         //         response: "Not Authenticated"
//         //     })
//         // }

//     } catch (err) {
//         console.log(err);
//         res.status(406).json({
//             response: "Invalid Input"
//         })
//     }
// });

// <<<<<<< HEAD
// module.exports = router;
// =======
// router.post("/get-all-file", async (req, res) => {
//   try {
//     // const userVerify = await verifyToken(req, res, 'trainer');
//     // console.log(userVerify)
//     // if (userVerify) {
//     var checkFiles = await CourseSch.find({}).lean();

//     if (!checkFiles) {
//       res.status(406).json({
//         response: false,
//         msg: "No such file found",
//       });
//     } else {
//       console.log(checkFiles);

//       res.status(200).json({
//         response: true,
//         msg: "Course media found",
//         mediaData: checkFiles,
//       });
//     }
//     // } else {
//     //     res.status(406).json({
//     //         response: "Not Authenticated"
//     //     })
//     // }
//   } catch (err) {
//     console.log(err);
//     res.status(406).json({
//       response: "Invalid Input",
//     });
//   }
// });

module.exports = router;
// >>>>>>> f0f3c9e2a6ec30805a094cb6d502e82e2f14fd10
