const express=require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const router=express.Router();
const userModel=require("../models/userModel")
const {editProfile,viewProfile,edit}=require("../controllers/profileController");
const multer=require("multer");
const path=require("path")


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../public/profilePic"));
    },
    filename:function(req,file,cb){
        const name=Date.now()+"-"+file.originalname;
        cb(null,name);
    }
});
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only .jpeg, .jpg, and .png formats are allowed!'));
    }
  };
const upload=multer({storage:storage,fileFilter:fileFilter});



router.get("/profile",isLoggedIn,async function(req,res){
    let userId=req.user._id;
    let user=await userModel.findOne({_id:userId});
    res.render("profile",{activeSection:"profilePage",user});
});



// router.get('/profile/:section', (req, res) => {
//     const section = req.params.section;
//     const validSections = ['overview', 'settings', 'posts', 'account'];

//     if (validSections.includes(section)) {
//         res.render('profile', { activeSection: section });
//     } else {
//         res.redirect('/profile/overview');
//     }
// });
// router.post("/profile/edit",isLoggedIn,editProfile);

router.get("/profile/viewProfile",isLoggedIn,viewProfile);
router.get("/profile/editProfile",isLoggedIn,async function(req,res){
    console.log("user id..",req.user._id);
    
    let user=await userModel.findOne({_id:req.user._id});
    
    res.render("dashboard",{page:"Edit Profile",user});
});

router.post("/profile/edit",upload.single("image"),isLoggedIn,edit);




module.exports=router;