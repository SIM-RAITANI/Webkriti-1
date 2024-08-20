module.exports=function restrictLoggedInAccess(req, res, next) {
    if (req.cookies.token) {
      // If the user is logged in, redirect to /home
      return res.redirect('/home');
    }
    // If the user is not logged in, proceed to the next middleware or route handler
    next();
}
  