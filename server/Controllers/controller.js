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


module.exports = router;
