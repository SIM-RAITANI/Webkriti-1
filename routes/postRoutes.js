const express=require("express");
const router=express.Router();
const postModel=require("../models/postModel");
const userModel=require("../models/userModel")
const isLoggedin=require("../middlewares/isLoggedIn");
const {createPost,likePost,editPost,editPostContent,deletePost,readPost,addComments,replyComment,uploadImage}=require("../controllers/postController");
const multer=require("multer");
const path = require('path');

//setting up multer
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../public/postImages"));
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

router.get("/post",isLoggedin,function(req,res){
    res.render("editor");
})
router.post("/post",isLoggedin,createPost)


router.get("/allposts",isLoggedin,async function(req,res){
    let userprofile=await userModel.findOne({_id:req.user._id}).populate("posts");
    res.render("dashboard",{page:"Show Posts",userprofile});

});
router.get("/post/like/:id",isLoggedin,likePost);
router.get("/post/edit/:id",isLoggedin,editPost);
router.post("/post/edit/:id",isLoggedin,editPostContent);
router.get("/post/delete/:id",isLoggedin,deletePost);
router.get("/post/read-post/:id",readPost);


router.post("/post/add-comment",isLoggedin,addComments);

//route to reply on the comment
router.post("/post/reply/:id", isLoggedin,replyComment);


//route to upload image
router.post("/post/upload-image",upload.single("image"),isLoggedin,uploadImage);

//to get the profile dashboard
router.get("/dashboard",isLoggedin,function(req,res) {
    res.render("dashboard",{page:""});
})




module.exports=router;