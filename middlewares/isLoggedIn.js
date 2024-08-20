const jwt=require("jsonwebtoken")
const userModel=require("../models/userModel");

module.exports=async function(req,res,next){
    if (!req.cookies.token){
       
        return res.redirect("/login");
        
    }

    try {
        let decoded=jwt.verify(req.cookies.token,"hellosim");
        let user=await userModel.findOne({email:decoded.email});
        req.user=user;
        next();

        
    } catch (error) {
        console.log(error);
        
    }



}