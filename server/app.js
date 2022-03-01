const express= require("express")
const app= express();
const mongoose= require('mongoose')
const dotenv =require("dotenv");

dotenv.config({path:'./config.env'})

require('./db/connection');

const middleware=(req,res,next)=>{
    console.log("middleware")
    next();
}
// middleware();

app.get("/",(req, res)=>{
   return res.send(`hello world `)

})

app.get('/about',middleware,(req, res)=>{
    return res.send("hello , Its about me rouut")

})

console.log("PORT5000");

app.listen(5000, ()=>{
    console.log(`server is runnoing on 5000`);
})