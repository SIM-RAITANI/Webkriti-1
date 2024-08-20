const isLogout=(req,res)=>{
    //user not logged-out
    if(!req.cookies.token){
       return  res.redirect("/landing");



    }
    else{
        return res.redirect("/home");
    }
    
    next();
}
module.exports={
    isLogout
}