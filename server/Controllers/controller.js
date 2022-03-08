const express = require('express');
const router = express.Router();
const bodyparser = require("body-parser");
const morgan = require('morgan');
const _ = require('lodash');


const fileUpload = require('express-fileupload');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// enable files upload
router.use(fileUpload({
    createParentPath: true
}));

//add other middleware
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(morgan('dev'));


router.use(cookieParser());
//importing models
const mongoose = require('mongoose');
const StudentSch = mongoose.model('StudentLogin');
const TrainerSch = mongoose.model('TrainerLogin');
const CourseSch = mongoose.model('Courses');

const { generateToken, verifyToken } = require('./jwt');
const { result } = require('lodash');

router.use(
    bodyparser.urlencoded({
        extended: true,
    })
);

router.get('/', (req, res) => {
    res.json({ msg: 'hello' });
});

router.post('/newStudent', async function (req, res) {

    if (req.body.email) {
        var checkExistingUser = await StudentSch.findOne({
            email: req.body.email
        });

        if (checkExistingUser) {
            res.status(406).json({
                response: false,
                msg: "Username is taken."
            })
        } else {
            const StudentLoginList = new StudentSch({
                name: req.body.name,
                email: req.body.username,
                password: req.body.password,
                interest: req.body.interest,
                contact: req.body.contact
            });
            StudentLoginList.save();
            res.status(200).json({
                response: true,
                msg: "New Student ID Created",
                name: req.body.name
            })
        }
    } else {
        res.status(406).json({
            response: "invalid input"
        })
    }

})

router.post('/loginStudent', async (req, res) => {

    const unm = req.body.email;
    const pss = req.body.password;
    const role = req.body.role;

    console.log(unm, pss, role);

    if ((unm != "") && (pss != "")) {
        var chkLogin = await StudentSch.findOne({
            $and: [{ email: unm }, { password: pss }]
        });

        if (chkLogin) {
            console.log('Login Success');


            var login = {
                loginId: chkLogin['_id'],
                loginName: chkLogin['name'],
                loginRole: role
            }

            const jwttoken = await generateToken(req, res, login)
            res.status(200).json({
                token: jwttoken,
                msg: "login success"
            });
        } else {
            res.status(406).json({
                title: "Login Error",
                msg: "Username or Password not correct",
            })
        }
    }

})


router.get('/homeStudent', async (req, res) => {

    try {
        const userVerify = await verifyToken(req, res, 'student');
        var loginName = userVerify.name;
        var role = userVerify.role;

        res.status(200).json({
            title: "Welcome Home",
            name: loginName,
            role: role
        });

    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: "Student ID not authenticated"
        })
    }

})


router.post('/newTrainer', async function (req, res) {
    console.log("newtrainer");

    console.log(req.body)
    if (req.body.username) {
        var checkExistingUser = await TrainerSch.findOne({
            username: req.body.username
        });


        if (checkExistingUser) {
            res.status(406).json({
                response: false,
                msg: "Username is taken."
            });
        } else {

            const TrainerList = new TrainerSch({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                expertise: req.body.expertise,
                contact: req.body.contact,
                experience: req.body.experience
            });
            TrainerList.save();
            res.status(200).json({
                response: true,
                msg: "New Trainer ID Created",
                username: req.body.username
            })
            console.log("saves");
        }
    } else {
        res.status(406).json({
            response: "invalid input"
        })
    }

})


router.post('/loginTrainer', async (req, res) => {

    const unm = req.body.email;
    const pss = req.body.password;
    const role = req.body.role;

    console.log(unm, pss, role);

    if ((unm != "") && (pss != "")) {
        var chkLogin = await TrainerSch.findOne({
            $and: [{ email: unm }, { password: pss }]
        });

        if (chkLogin) {
            console.log('Login Success');


            var login = {
                loginId: chkLogin['_id'],
                loginName: chkLogin['name'],
                loginRole: role
            }

            const jwttoken = await generateToken(req, res, login)
            res.status(200).json({
                token: jwttoken,
                msg: "login success"
            });
        } else {
            res.status(406).json({
                title: "Login Error",
                msg: "Username or Password not correct",
            })
        }
    }

})



router.get('/homeTrainer', async (req, res) => {

    try {
        const userVerify = await verifyToken(req, res, 'trainer');
        var loginName = userVerify.name;
        var role = userVerify.role;

        res.status(200).json({
            title: "Welcome Home",
            name: loginName,
            role: role
        });

    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: "Trainer ID not authenticated"
        })
    }

})


router.post('/upload-one', async (req, res) => {
    try {
        const userVerify = await verifyToken(req, res, 'trainer');
        // console.log(userVerify)

        if (userVerify.name && (userVerify.role).toLowerCase() == 'trainer') {
            if (!req.files) {
                res.status(406).send({
                    status: false,
                    message: 'No file uploaded'
                });
            } else {

                let mediaFile = req.files.mediaFile;    //

                mediaFile.mv('./uploads/' + mediaFile.name);  //

                // var filetype = mediaFile.mimetype.split('/')[1];    //
                // var saveFileName = `${mediaFile.name}`;

                uploadedFile = {
                    name: mediaFile.name,
                    mimetype: mediaFile.mimetype,
                    size: mediaFile.size
                }
                const newCourse = new CourseSch({
                    courseName: req.body.courseName,
                    courseCode: req.body.courseCode,
                    courseMedia: mediaFile.name
                });
                newCourse.save();
                // res.json({
                //     response: true,
                //     msg: "New Course Added",
                //     course: req.body.courseName,
                //     courseCode: req.body.courseCode
                // })


                res.status(200).send({
                    status: true,
                    message: 'File is uploaded',
                    data: {
                        courseName: req.body.courseName,
                        courseCode: req.body.courseCode,
                        courseMedia: uploadedFile
                    }
                });
                console.log("uploaded")
            }
        } else {
            res.status(406).json({ response: 'Not Authenticated' })
        }
    } catch (err) {
        res.status(406).status(500).send(err);
    }
});


router.post('/upload-many', async (req, res) => {
    try {
        const userVerify = await verifyToken(req, res, 'trainer');
        console.log("cc",userVerify)
        if (userVerify.id && (userVerify.role).toLowerCase() == 'trainer') {
            if (!req.files) {
                res.status(406).send({
                    status: false,
                    message: 'No file uploaded'
                });
            } else {
                let data = [];

                //loop all files
                _.forEach(_.keysIn(req.files.mediaFiles), (key) => {
                    let mediaFile = req.files.mediaFiles[key];

                    //move mediaFile to uploads directory
                    mediaFile.mv('./uploads/' + mediaFile.name);

                    //push file details
                    data.push({
                        name: mediaFile.name,
                        mimetype: mediaFile.mimetype,
                        size: mediaFile.size
                    });

                    const newCourse = new CourseSch({
                        courseName: req.body.courseName,
                        courseCode: req.body.courseCode,
                        courseMedia: mediaFile.name
                    });
                    newCourse.save();

                });

                //return response
                res.status(200).send({
                    status: true,
                    message: 'Files are uploaded',
                    data: data
                });
            }
        } else {
            res.status(406).json({ response: 'Not Authenticated' })
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            response: "Trainer ID not authenticated"
        })
    }


});

// router.post('/add-course', async (req, res) => {
//     if (req.body.courseName) {
//         var checkCourse = await CourseSch.findOne({
//             courseCode: req.body.courseCode
//         });

//         if (checkCourse) {
//             res.json({
//                 response: false,
//                 msg: "Course Code exists"
//             })
//         } else {

//             const Course = new CourseSch({
//                 courseName: req.body.courseName,
//                 courseCode: req.body.courseCode,
//                 courseMedia: req.body.courseMedia
//             });
//             Course.save();
//             res.json({
//                 response: true,
//                 msg: "New Course Added",
//                 course: req.body.courseName,
//                 courseCode: req.body.courseCode
//             })
//         }
//     } else {
//         res.json({
//             response: "invalid input"
//         })
//     }
// })


router.get('/get-file', async (req, res) => {
    try {
        const userVerify = await verifyToken(req, res, 'trainer');
        console.log(userVerify)
        if (userVerify) {
            var checkFiles = await CourseSch.findOne({
                $and: [{
                    courseCode: req.body.courseCode

                }, {
                    courseMedia: req.body.courseMedia

                }]
            });

            if (!checkFiles) {
                res.status(406).json({
                    response: false,
                    msg: "No such file found"
                })
            } else {

                res.status(200).json({
                    response: true,
                    msg: "Course media found",
                    courseName: checkFiles.courseName,
                    courseCode: checkFiles.courseCode,
                    courseMedia: checkFiles.courseMedia
                })
            }
        } else {
            res.status(406).json({
                response: "invalid input"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            response: "Not Authenticated"
        })
    }
});

router.get('/get-all-file', async (req, res) => {
    try {
        const userVerify = await verifyToken(req, res, 'trainer');
        console.log(userVerify)
        if (userVerify) {
            var checkFiles = await CourseSch.find({}).lean();
       

            if (!checkFiles) {
                res.status(406).json({
                    response: false,
                    msg: "No such file found"
                })
            } else {
                console.log(checkFiles)

                res.status(200).json({
                    response: true,
                    msg: "Course media found",
                    mediaData : checkFiles
                })
            }
        } else {
            res.status(406).json({
                response: "Not Authenticated"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            response: "Invalid Input"
        })
    }
});

module.exports = router;