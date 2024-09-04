const express=require("express");
const router=express.Router();
const {isLogin,registerUser,logout,forgetPassword, resetPassword,setResetPass,getHomePage}=require("../controllers/authController");
const logoutMiddleware=require("../middlewares/isLogout");
const isLoggedInMiddleware=require("../middlewares/isLoggedIn");
const checkAuthentication=require("../middlewares/checkAuthentication");
const restrictLoggedInAccess=require("../middlewares/restrictLoggedInAccess")

router.get("/",checkAuthentication,function(req,res){
    res.send("hello");
})
router.get("/landing",restrictLoggedInAccess,function(req,res){
    res.render("landing");

});
router.get("/login",restrictLoggedInAccess,function(req,res){
    res.render("login",{msg:""});
});
router.get("/signup",restrictLoggedInAccess,function(req,res){
    res.render("signup",{msg:""})
})
router.get("/home",isLoggedInMiddleware,getHomePage);


//set up the get route to change the password via email
router.get("/forget-password",function(req,res){
    res.render("forgetPass");

});
router.get("/reset-password",resetPassword);


router.post("/reset-password",setResetPass);
router.post("/login",isLogin);
router.post("/signup",registerUser);
router.get("/logout",logout);
router.post("/forget-password",forgetPassword);

module.exports=router; 