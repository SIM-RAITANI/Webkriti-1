const postModel=require("../models/postModel");
const userModel=require("../models/userModel");
const likeModel=require("../models/likeModel");
const { format } = require('date-fns');
const mongoose=require("mongoose");
const { ObjectId } = require('mongodb');

module.exports.createPost=async function(req,res){
    console.log("creaiting post");
    var imagePath;
     console.log("req-body",req.body);
     
    console.log("image-src",req.body.imageSrc);
    

    if (req.body.imageSrc){
           imagePath=req.body.imageSrc;
    }
    else{
        imagePath="https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    }
    
    let content=req.body.content;
    let description=req.body.description;
    let title=req.body.title;
    let author=req.user.name;
    let authorEmail=req.user.email;
    let user=req.user;
    let category=req.body.category;
    
    // console.log(user);
    

    let post=await postModel.create({
        content,
        description,
        title,
        author,
        authorEmail,
        user,
        image:imagePath,
        category

    });
    let userprofile=await userModel.findOne({_id:user._id}).populate("posts");
    await userprofile.posts.push(post._id);
    await userprofile.save();




    //After that redirect the user to page containing all posts for now i am redirecting to the preview of post
    // res.redirect("/allposts")
    res.send({success:true,msg:"Post created successfully",_id:post._id})
    
    
}
module.exports.likePost=async function(req,res){
    let postId=req.params.id;
    let post=await postModel.findOne({_id:postId}).populate("user");
    console.log(post);
    
    //if not liked
    if (post.likes.indexOf(req.user._id) === -1){
        post.likes.push(req.user._id);
        
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user._id),1);
    }
    await post.save();
    res.redirect("/allposts")
}
module.exports.editPost=async function(req,res){
    try {
        let postId = req.params.id;
        let post=await postModel.findOne({_id : postId});
        console.log("post id-",postId);
    

    res.render("editPost",{post});
    } catch (error) {
       console.log(error);
        
    }
}
module.exports.editPostContent=async function(req,res){
    try {
        
        let postId=req.params.id;
        
        let post = await postModel.updateOne({_id:postId},{$set:{title:req.body.title,description:req.body.description,content:req.body.content}});
        let sim=await postModel.findOne({_id:postId});
        console.log("sim post:",sim);
        

        console.log("after post edit:",post);
        

        res.status(200).send({success:true,message:"Post updated successfully"});

    } catch (error) {
        console.log(error);
        
    }

}
module.exports.deletePost=async function(req,res){
    try {
        let postId=req.params.id;
        await postModel.findByIdAndDelete(postId);
        await userModel.findByIdAndUpdate(req.user._id, { $pull: { posts: postId } });

    

        res.status(200).send({msg:"Post deleted successfully",success:true})
    } catch (error) {
       console.log(error) 
    }

}
module.exports.readPost=async function(req,res) {
    let postId=req.params.id;
    let likes = await likeModel.find({ post_id: postId, type: 1 }).countDocuments();
    let dislikes = await likeModel.find({ post_id: postId, type: 0 }).countDocuments();
    let token;
    if (req.cookies.token){
        token=true;
    }


    
    let post=await postModel.findOne({_id:postId}).populate("comments.createdBy").populate("comments.replies.createdBy").populate("user");
    console.log(post);
    
    
    const isoDate = post.date || new Date();
    
    
    
    const formattedDate = format(new Date(isoDate), 'MMMM do, yyyy');
    
    res.render("specificPost",{post,date:formattedDate,likes,dislikes,postId:req.params.id,userId:post.user._id})
    
}

module.exports.addComments = async function(req, res) {
    try {
        let post = await postModel.findByIdAndUpdate(
            req.body.postId,
            {
                $push: {
                    comments: {  // Assuming `comments` is an array field in your Post model
                        text: req.body.comment,
                        createdBy: req.user._id // Add this if you want to track the user who made the comment
                    }
                }
            },
            { new: true } // Returns the updated document
        );
        console.log(post)

        // res.status(200).redirect(`/post/read-post/${req.body.postId}`);
        res.status(200).send({success:true,msg:"Comment added successfully!",_id:post.comments._id,username:req.user.name})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding comment" });
    }
};

//reply to a particular comment
module.exports.replyComment=async function(req, res) {
    try {
        console.log(`Received reply for commentId: ${req.params.id}`);
        const postId =new mongoose.Types.ObjectId(req.body.postId);
        const commentId = req.body.commentId;
        
        // Convert commentId to a MongoDB ObjectId
        const objectId = new ObjectId(commentId);
        const replyText = req.body.reply;
        console.log(req.user);
        
        const userId = req.user._id;

        // Find the post and update the specific comment's replies array
        let updatedPost = await postModel.findOneAndUpdate(
            {
                "_id": postId,
                "comments._id": objectId
            },
            {
                $push: {
                    "comments.$.replies": {
                        text: replyText,
                        createdBy: userId
                    }
                }
            },
            { new: true, useFindAndModify: false }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post or Comment not found" });
        }
         
        // Send back the updated post or a success message
        res.status(200).send({msg:"Reply added successfully",success:true,_id:commentId,username:req.user.name});
    } catch (err) {
        console.error("Error adding reply:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports.uploadImage=async function(req,res){
    try {

        if (req.file){
            var imagePath="/postImages";
            console.log(req.file.filename);
            
            imagePath = imagePath + "/"+ req.file.filename;

            res.send({success:true,msg:"Image uploaded successfully",path:imagePath});
        }
        else{
            res.status(400).send({success:false,msg:'File upload failed. Please upload a valid image file.'});
        }
        
    } catch (error) {
        res.send({success:false,msg:error.message})
    }
}


