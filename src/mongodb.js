const mongoose=require("mongoose");
const { type } = require("os");

mongoose.connect("mongodb://localhost:27017/MusiciansChoice")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
})

const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    name:{
        password:String,
        required:true
    }
})

const collection=new mongoose.model("LogInCollection",LogInSchema)

module.exports=collection