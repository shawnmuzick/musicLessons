module.exports = {
    isLoggedIn: (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      } else {
        req.flash("message", "Please Log In to use this route");
        res.redirect("/login");
      }
    },
    isAdmin:(req,res,next)=>{
      if(req.user.role !== 'admin'){
        req.flash("message", "Please Log In as an Admin to use this route");
        res.redirect("/login");
      }else{
        return next();
      }
    }
  };
  