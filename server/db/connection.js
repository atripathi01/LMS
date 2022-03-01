const mongoose= require('mongoose')

const DB= process.env.DATABASE;

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{console.log("connnected...bala bal bal")}).catch((err)=>{console.log("o no error",err)});