const LocalStrategy = require("passport-local").Strategy;
const { userModel } = require("./models");
const bcrypt = require("bcrypt");

//pass in passport from function run in server.js
module.exports = passport => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      //match user
      userModel.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect Username" });
        }
        if (
          bcrypt.compare(password, user.password, (err, match) => {
            //passwords match
            if (err) throw err;
            if (match) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Incorrect Password" });
            }
          })
        ) {
        }
      });
    })
  );
  passport.serializeUser(function(user, done) {
    console.log("serialized user");
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    userModel.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
