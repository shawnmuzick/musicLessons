module.exports = {
  isLoggedIn: (req, res, next) => {
    console.log('checking is logged in')
    if (req.isAuthenticated()) {//hangs
      console.log('check passed')
      return next(); //non-negotiable
    } else {
      console.log('check failed')
      res.status(400).send({message:'this is an error'});
      return;
    }
  },
  isAdmin: (req, res, next) => {
    if (req.user.role !== "admin") {
      res.redirect("/login");
    } else {
      return next();
    }
  },
};
