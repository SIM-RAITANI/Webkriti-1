const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");
const Randomstring = require("randomstring");
const nodemailer = require("nodemailer");
const passwordConfig = require("../config/password-config");
const postModel=require("../models/postModel");

//function to send mail using smtp gmail engine
const sendEmailReset = async (email, name, token) => {
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      requireTLS: true, // Use TLS
      auth: {
        user: passwordConfig.userEmail, // Your email
        pass: passwordConfig.userPass, // Your email password or app password
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: "lekhluster@gmail.com", // Sender address
      to: email, // List of recipients
      subject: "Reset your Password", // Subject line
      html: `<p>Hello ${name}!!</p><br><br>Click on the link <a href="http://127.0.0.1:3000/reset-password?token=${token}">here</a> to reset password.`, // HTML body
    };

    transport.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log("Error occurred:", err);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.isLogin = async function (req, res) {
  try {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (!user) {
      res.send("NO SUCH USER EXISTES");
    } else {
      console.log(user);
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          let token = generateToken(user);
          res.cookie("token", token);
          res.redirect("/home");
        } else {
          res.send("WRONG CREDENTIALS");
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports.registerUser = async function (req, res) {
  try {
    let { phone, name, email, password } = req.body;

    let user = await userModel.find({ email: email });
    if (user.length === 0) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          let user = await userModel.create({
            email,
            name,
            password: hash,
          });

          let token = generateToken(user);
          res.cookie("token", token).redirect("/home");
        });
      });
    } else {
      console.log("working not");

      res.status(401).redirect("/home");
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports.logout = function (req, res) {

  try {

    res.cookie("token", "");
    
    res.redirect("/landing");

    
  } catch (error) {
    console.log(error);
    
  }


  
    

  
};
//function to reset the password field using nodemailer / randomstring
module.exports.forgetPassword = async function (req, res) {
  try {
    //fetch the email to verify the user
    let email = req.body.email;

    let userData = await userModel.findOne({ email: email });

    if (userData) {
      let token = Randomstring.generate();
      await userModel.updateOne({ email: email }, { $set: { token: token } });

      sendEmailReset(userData.email, userData.name, token);
      res.render("forgetPass", {
        message: "Check your mail to reset password!!",
      });
    } else {
      res.render("forgetPass", { message: "Wrong Credentials" });
    }
  } catch (error) {}
};
module.exports.resetPassword = async function (req, res) {
  try {
    let token = req.query.token;
    console.log(token);

    let userData = await userModel.findOne({ token: token });
    console.log(userData);

    if (userData) {
      console.log(userData._id);

      res.render("resetPass", { user_id: userData._id });
    } else {
      res.render("404");
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports.setResetPass = async function (req, res) {
  try {
    let newPassword = req.body.newPassword;
    let confirmNewPassword = req.body.confirmNewPassword;
    let userId = req.body.user_id;

    if (newPassword === confirmNewPassword) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newPassword, salt, async function (err, hash) {
          let user = await userModel.updateOne(
            { _id: userId },
            { $set: { password: hash, token: "" } }
          );
          user.save();
          if (user) {
            console.log(user);

            res.redirect("/login");
          } else {
            res.render("404");
          }
        });
      });
    } else {
      res.render("resetPass", {
        message: "Kindly check your password",
        user_id: userId,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports.getHomePage=async function(req,res){
  let food=await postModel.findOne({category:"Food"});
  let tech=await postModel.findOne({category:"Technology"});
  let beauty=await postModel.findOne({category:"Beauty"});
  let science=await postModel.findOne({category:"Science"});
  
  let travel=await postModel.findOne({category:"Travel"});

  res.render("home",{food,tech,beauty,science,travel});
  

}
