const express=require("express");
const app=express();
const path=require("path");
const cookieParser=require("cookie-parser");
const authRoutes=require("./routes/authRoutes");
const postRoutes=require("./routes/postRoutes");
const profileRoutes=require("./routes/profileRoutes")
const homeRoutes=require("./routes/homeRoutes");
const likeModel=require("./models/likeModel");
const multer=require("multer");

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'none'; script-src 'self' 'blob:' https://webkriti-1-41korl07v-sim-raitanis-projects.vercel.app");
    next();
  });
  

//using font-awesome in node
app.use(express.static('node_modules/@fortawesome/fontawesome-free'));


//setting up multer in our project



//using socket-io in our project: setting up connections.

const http=require("http").createServer(app);
const {Server}=require("socket.io");
const io = new Server(http,{

    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});


io.on("connection", function(socket) { 
    console.log("User connected");

    socket.on("new_post", function(formData) {
        console.log("New post received:", formData);
        socket.broadcast.emit("new_post", formData); // Broadcast new post to all clients except the sender
    });

    socket.on("new_comment", function(comment) {
        console.log("New comment received:", comment);
        io.emit("new_comment", comment); // Broadcast new comment to all clients
    });

    socket.on("new_reply", function(reply) {
        console.log("New reply received:", reply);
        io.emit("new_reply", reply); // Broadcast new reply to all clients
    });

    socket.on("post_deleted", function(postId) {
        console.log("Post deleted:", postId);
        io.emit("post_deleted", postId); // Broadcast post deletion to all clients
    });
    socket.on("post_updated", function(data) {
        console.log("Post updated:", data);
        io.emit("post_updated", data); // Broadcast post deletion to all clients
    });

    socket.on("like",async function(data){
         await likeModel.updateOne({
            post_id:data.post_id,
            user_id:data.user_id
         },{
            type:1
         },{
            upsert:true
         })

         const likes=await likeModel.find({post_id:data.post_id,type:1}).countDocuments();
         const dislikes=await likeModel.find({post_id:data.post_id,type:0}).countDocuments();

         io.emit("like_dislike",{
            post_id:data.post_id,
            likes:likes,
            dislikes:dislikes
         })

    })
    socket.on("dislike",async function(data){
         await likeModel.updateOne({
            post_id:data.post_id,
            user_id:data.user_id
         },{
            type:0
         },{
            upsert:true
         })

         const likes=await likeModel.find({post_id:data.post_id,type:1}).countDocuments();
         const dislikes=await likeModel.find({post_id:data.post_id,type:0}).countDocuments();



         io.emit("like_dislike",{
            post_id:data.post_id,
            likes:likes,
            dislikes:dislikes
         })

    })
});



const db=require("./config/mongoose-connection");

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
require("dotenv").config();

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));



app.use("/",authRoutes);
app.use("/",postRoutes);
app.use("/",homeRoutes);
app.use("/",profileRoutes);


http.listen(3000,function(){
    console.log("Server is running");
    
})
