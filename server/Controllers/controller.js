
const mongoose = require('mongoose');

const RegistrationSch = mongoose.model('Registration');

const { hashPassword, comparePassword } = require('./hashed')
const { generateToken, verifyToken } = require('./jwt');

const active = async (req, res) => {
    try {
        res.status(200).json({
            msg: "Success"
        });
    } catch (error) {
        console.log(error);
        res.status(406).json({
            msg: error.toString()
        });
    }
}

const signIn = async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error);
        res.status(406).json(error)
    }

};

module.exports = {
    active,
    signIn
}