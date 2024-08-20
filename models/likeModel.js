const mongoose=require("mongoose");
const likeSchema=mongoose.Schema({

    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    type:{
        type:Number,
        required:true
    }
});

module.exports=mongoose.model("like",likeSchema);