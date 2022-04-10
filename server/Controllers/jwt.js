

const dotenv = require("dotenv");
dotenv.config({ path: './config.env' })
const jwt = require('jsonwebtoken');

const secret = process.env.PRIVATE_KEY;

module.exports.generateToken = function (req, res, login) {

    // console.log("Secret :----", secret);
    const jwttoken = jwt.sign({
        id: login.loginId,
        name: login.loginName,
        role: login.loginRole
    },
        secret, {
        expiresIn: 60 * 60 * 24
    });

    res.header('Authorization', 'Bearer ' + jwttoken);
    return jwttoken;
};

module.exports.verifyToken = function (req, res) {

    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    // console.log("inside jwt verify token")
    // console.log(req.headers);
    // console.log(typeof bearerHeader)
    if (bearerHeader) {
        // if (typeof bearerHeader !== 'undefined') {
        // console.log('111111111')
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        //  console.log(bearerToken);
        const tokenVerify = jwt.verify(req.token, secret);
        // console.log(tokenVerify, "bihnbhihnuihniuji")

        return tokenVerify;
    } else {
        console.log("Invalid token");
        return false;
    }

}