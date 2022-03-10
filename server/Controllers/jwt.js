
const dotenv = require("dotenv");
dotenv.config({ path: './config.env' })
const jwt = require('jsonwebtoken');

const trainerSecret = process.env.privateKeyTrainer;
const studentSecret = process.env.privateKeyStudent;

module.exports.generateToken = function (req, res, login) {
    var secret = "";

    if (login.loginRole == 'student') {
        secret = studentSecret;
    } else {
        secret = trainerSecret;
    }
    console.log(secret);
    const jwttoken = jwt.sign({ id: login.loginId, name: login.loginName, role: login.loginRole }, secret, { expiresIn: '30 minutes' });

    res.header('Authorization', 'Bearer ' + jwttoken);
    return jwttoken;
};

module.exports.verifyToken = function (req, res, role) {
    var secret = "";

    if (role == 'student') {
        secret = studentSecret;
    } else {
        secret = trainerSecret;
    }

    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    console.log("inside jwt verify token")
    console.log(typeof bearerHeader)
    if (typeof bearerHeader !== 'undefined') {
        // console.log('1')
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        
        // const vrfy = jwt.verify(req.token, secret);
        // console.log(vrfy.json())
        
        return jwt.verify(req.token, secret);
    }
}