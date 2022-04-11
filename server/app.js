require('./models/db');
const express= require("express");
const dotenv =require("dotenv");
dotenv.config({path:'./config.env'})
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const adminRouter = require('./Routers/adminRouter');
const routers = require('./Routers/routers');
const courseRouter = require('./Routers/courseRouter');
const assignmentRouter = require('./Routers/assignmentRouter');

app.use('/admin', adminRouter);
app.use('/course', courseRouter);
app.use('/assignment', assignmentRouter);
app.use('/', routers);

const directory = path.join(__dirname, '/uploads');
// app.use('/uploads', express.static(directory));

const port = process.env.PORT;
app.listen(port, (error)=>{
    if(error) {
        console.log(error);
        throw error;
    }
    console.log(`Server is up on ${port}`);
})

// var mongoUtil = require( './models/db' );

// mongoUtil.connectToServer( function( err, client ) {
//   if (err) console.log(err);
//   // start the rest of your app here
// } );