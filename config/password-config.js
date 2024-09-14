
require('dotenv').config();

// Access environment variables
const userEmail = process.env.USER_EMAIL;
const userPass = process.env.USER_PASS;

// const userEmail="lekhluster@gmail.com";
// const userPass=  "vvin jyap fhub hcpp" ;

module.exports={
    userEmail,
    userPass
}