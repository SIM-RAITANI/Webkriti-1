const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://simranraitani9:simraitani3249@cluster0.dnw1w.mongodb.net/blog-database?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("connected");

}).catch((err)=>{
    console.log(err);
});

module.exports=mongoose.connection;