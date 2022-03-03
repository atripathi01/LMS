require('./models/db');
const express= require("express");
const dotenv =require("dotenv");

dotenv.config({path:'./config.env'})
const app = express();

const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');

const controller = require('./Controllers/controller');

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cookieParser());

app.use('/', controller);

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server is up on ${port}`);
})