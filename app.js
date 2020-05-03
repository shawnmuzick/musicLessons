const express = require("express");
const apiRouter = require("./routes/apiRouter");
const viewRouter = require("./routes/viewRouter");
const passport = require("passport");
const session = require("express-session");
const app = express();
const PORT = process.env.port || 5001;
const logger = (req,res,next) => {
  console.log("logged request");
  next();
};
app.set("view engine", "ejs");
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
//Passport config
require("./config/passport.js")(passport);
app.use("/assets", express.static("public"));
app.use("/api", logger, apiRouter);
app.use("/", viewRouter);
app.use("/", express.static("build"));

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
