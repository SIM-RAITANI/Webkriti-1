const mongoose=require("mongoose");


const feedBack=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    feedback:{
        type:"String"

    }
})

module.exports=mongoose.model("feedback",feedBack);