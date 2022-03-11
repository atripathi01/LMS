require('./models/db');
const express= require("express");
const dotenv =require("dotenv");
dotenv.config({path:'./config.env'})
const path = require('path');


const controller = require('./Controllers/controller');

const cors = require('cors');

const app = express();

app.use(cors());

const directory = path.join(__dirname, '/uploads');
app.use('/', controller);
app.use('/uploads', express.static(directory));

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server is up on ${port}`);
})
