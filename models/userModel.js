const mongoose =require("mongoose");

const userSchema ={
    id:Number,
    name:String,
    email:String,
    password:String,
    funds:Number
}

const User=mongoose.model("User",userSchema);

module.exports=User;
