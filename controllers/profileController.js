const userModel = require("../models/userModel");

module.exports.editProfile = async function (req, res) {
  let userId = req.user._id;
  let user = await userModel.findOne({ _id: userId });
  res.render("dashboard", { page: "Edit Profile", user });
};

module.exports.viewProfile = async function (req, res) {
  try {
    let userId = req.user._id;
    let userInfo = await userModel.findOne({ _id: userId });
    console.log("User information...", userInfo);

    res.render("dashboard", { userInfo, page: "View Profile" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.edit = async function (req, res) {
  console.log("profile edit...");
  try {
    
    
    let { name, gender, about, description} = req.body;
     // Ensure profilePic is coming from req.body

     var profilePic="";
     if (req.file){
      var imagePath="/profilePic";
      console.log(req.file.filename);
      
      imagePath = imagePath + "/"+ req.file.filename;
      profilePic=imagePath;
      console.log("profilePic .....",profilePic,imagePath);
      
     }
    let userId = req.user._id;
    console.log("user id during post...",userId);
    

    // Use findByIdAndUpdate to get the updated document
    const user = await userModel.findByIdAndUpdate(
      userId,
      {
          ...(name && { name }),
          ...(gender && { gender }),
          ...(about && { about }),
          ...(description && {description}),
          ...(profilePic && {profilePic})
      },
      { new: true, runValidators: true }
  );

    console.log("Updated user:", user);
    res.redirect("/home"); // Redirect after the update
    
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while updating the profile.");
  }
}
