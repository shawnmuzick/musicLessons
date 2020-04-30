module.exports = {
  isLoggedIn: (req, res, next) => {
    console.log('isLoggedIn:');
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      return next();
    } else {
      return;
    }
  },
  isAdmin: (req, res, next) => {
    if (req.user.role !== "admin") {
      req.flash("message", "Please Log In as an Admin to use this route");
      res.redirect("/login");
    } else {
      return next();
    }
  },
};
