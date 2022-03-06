require('./models/db');
const express= require("express");
const dotenv =require("dotenv");
dotenv.config({path:'./config.env'})


const controller = require('./Controllers/controller');


const app = express();


app.use('/', controller);

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server is up on ${port}`);
})
