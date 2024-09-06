const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://sujitraitani9:4JtyRHMEglY0oTOf@cluster0.nhaep.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("connected");

}).catch((err)=>{
    console.log(err);
});

module.exports=mongoose.connection;