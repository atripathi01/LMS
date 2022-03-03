const express = require('express');
const router = express.Router();

//importing models
const mongoose = require('mongoose');
const StudentSch = mongoose.model('StudentLogin');
const TrainerSch = mongoose.model('TrainerLogin');

const { generateToken, verifyToken } = require('./jwt');

const bodyparser = require("body-parser");
router.use(
    bodyparser.urlencoded({
        extended: true,
    })
);

router.get('/', (req, res) => {
    res.json({ msg: 'hello' });
});

router.post('/newStudent', async function (req, res) {

    if (req.body.username) {
        var checkExistingUser = await StudentSch.findOne({
            username: req.body.username
        });

        if (checkExistingUser) {
            res.json({
                response: false,
                msg: "Username is taken."
            })
        } else {
            const StudentLoginList = new StudentSch({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                interest: req.body.interest,
                contact: req.body.contact
            });
            StudentLoginList.save();
            res.json({
                response: true,
                msg: "New Student ID Created",
                username: req.body.username
            })
        }
    } else {
        res.json({
            response: "invalid input"
        })
    }

})

router.post('/loginStudent', async (req, res) => {

    const unm = req.body.username;
    const pss = req.body.password;
    const role = req.body.role;

    console.log(unm, pss, role);

    if ((unm != "") && (pss != "")) {
        var chkLogin = await StudentSch.findOne({
            $and: [{ username: unm }, { password: pss }]
        });

        if (chkLogin) {
            console.log('Login Success');


            var login = {
                loginId: chkLogin['_id'],
                loginName: chkLogin['name'],
                loginRole: role
            }

            const jwttoken = await generateToken(req, res, login)
            res.json({
                token: jwttoken,
                msg: "login success"
            });
        } else {
            res.json({
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

        res.json({
            title: "Welcome Home",
            name: loginName,
            role: role
        });

    } catch (err) {
        console.log(err);
        res.json({
            msg: "Student ID not authenticated"
        })
    }

})


router.post('/newTrainer', async function (req, res) {

    if (req.body.username) {
        var checkExistingUser = await TrainerSch.findOne({
            username: req.body.username
        });

        if (checkExistingUser) {
            res.json({
                response: false,
                msg: "Username is taken."
            })
        } else {
            const TrainerList = new TrainerSch({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                expertise: req.body.expertise,
                contact: req.body.contact,
                experience: req.body.experience
            });
            TrainerList.save();
            res.json({
                response: true,
                msg: "New Trainer ID Created",
                username: req.body.username
            })
        }
    } else {
        res.json({
            response: "invalid input"
        })
    }

})


router.post('/loginTrainer', async (req, res) => {

    const unm = req.body.username;
    const pss = req.body.password;
    const role = req.body.role;

    console.log(unm, pss, role);

    if ((unm != "") && (pss != "")) {
        var chkLogin = await TrainerSch.findOne({
            $and: [{ username: unm }, { password: pss }]
        });

        if (chkLogin) {
            console.log('Login Success');


            var login = {
                loginId: chkLogin['_id'],
                loginName: chkLogin['name'],
                loginRole: role
            }

            const jwttoken = await generateToken(req, res, login)
            res.json({
                token: jwttoken,
                msg: "login success"
            });
        } else {
            res.json({
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

        res.json({
            title: "Welcome Home",
            name: loginName,
            role: role
        });

    } catch (err) {
        console.log(err);
        res.json({
            msg: "Trainer ID not authenticated"
        })
    }

})


module.exports = router;