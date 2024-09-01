const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        default:"He/She"
    }
    ,
    about:{
        type:String,
        default:"https://tse3.mm.bing.net/th?id=OIP.LxjOupTnLzVHAnMyXN2WOwHaHa&pid=Api&P=0&h=180"
    },
    description:{
        type:String,
        default:"Blogger at Lekh Luster"
    }
    ,
    profilePic:{
        type:String,
        default:""
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"post"
        }
    ],
    token:{
        type:String,
        default:""
    }

});
module.exports=mongoose.model("user",userSchema);