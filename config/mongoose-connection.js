const mongoose=require("mongoose");

mongoose.connect(process.env.mongouri).then(()=>{
    console.log("connected");

}).catch((err)=>{
    console.log(err);
});

module.exports=mongoose.connection;