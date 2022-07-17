const mongoose = require("mongoose");

const landSchema ={ // types : 1=property 2=park 3=road 
    id:Number,
    type:Number,
    available:Boolean,
    price:Number,
    owner:String,
    link:String,
    ownerId:Number
}

const Land=mongoose.model("Land",landSchema);

module.exports=Land;