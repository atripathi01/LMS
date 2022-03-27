//file for database connection

const mongoose = require('mongoose');
const dotenv =require("dotenv");

dotenv.config({path:'./config.env'})
const db = process.env.DATABASE;

// mongoose.connect(db, { useNewUrlparser: true }, (err) => {
    mongoose.connect('mongodb://localhost:27017/dono_lms', { useNewUrlparser: true }, (err) => {
    if (!err) {
        console.log('Connection Successful');
    } else {
        console.log('Connection Failed');
    }
});
require('./RegistrationModel');
require('./AdminModel');
require('./courseModel');


