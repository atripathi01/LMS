//file for database connection

const mongoose = require('mongoose');
const dotenv = require("dotenv");
// var AutoIncrementFactory = require('mongoose-sequence')(mongoose);
dotenv.config({ path: './config.env' })
const dbUrl = process.env.DATABASE;
// var _db;


//  mongoose.connect(dbUrl, { useNewUrlparser: true }, (err, client) => {
mongoose.connect('mongodb://localhost:27017/dono_lms', { useNewUrlparser: true }, (err) => {
    if (!err) {
        // _db  = client.db('dono_lms');
        console.log('Connection Successful.');
        // return _db
    } else {
        console.log('Connection Failed');
    }
});

// var conn = mongoose.connection
// conn = conn.collection('members')
// module.exports = conn
// const MongoClient = require('mongodb').MongoClient;
// // const url = "mongodb://localhost:27017";
// // const Db = require('mongodb').Db
// let db = null;

// module.exports = {

//     connectToServer: function (callback) {
//         MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, client) {

//             if (err) {
//                 return callback(err);

//             }
//             db = client.db('dono_lms');
//             console.log(db);
//             console.log('Connection Success');
//             // return _db


//         });
//     },
//     db: function(){
//         dbs =mongoose.connection;
//         return dbs
//     }

// };

require('./memberModel');
require('./adminModel');
require('./courseModel');
// require('./assignmentModel');


// module.exports = conn