module.exports=function checkAuthentication(req, res, next) {
    if (req.cookies.token) {
      // If user session exists, redirect to the home page
      return res.redirect('/home');
    } else {
      // If no user session, continue to the landing page
      return res.redirect('/landing');
    }
  }
  