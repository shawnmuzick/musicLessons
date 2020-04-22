const express = require("express");
const {userModel } = require("../models.js");
const passport = require("passport");
const bcrypt = require("bcrypt");
const urlEncodedParser = express.urlencoded({ extended: true, limit: "50mb" });
const jsonParser = express.json({ limit: "50mb" });
const router = express.Router();
const saltRounds = 10;

//Interface--------------------------------------------------------------
router.get("/login", (req, res) => {
  res.render("login");
});
router.post(
  "/login",
  urlEncodedParser,
  jsonParser,
  passport.authenticate("local",{failureRedirect:'/login'}),
  (req, res) => {
    if (req.user) {
      const date = new Date();
      console.log(`User ID:${req.user._id} logged in at ${date}`);
      res.redirect("/");
    }
  }
);
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", urlEncodedParser, jsonParser, (req, res) => {
  const { username, password, fname, lname } = req.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err;
    if (hash) {
      let newUser = new userModel({
        username,
        password: hash,
        fname,
        lname
      });
      newUser.save((err, success) => {
        if (err) throw err;
        if (!fs.existsSync("./server/logs")) {
          fs.mkdirSync("./server/logs");
        }
        fs.appendFile(
          "./server/logs/users.txt",
          `Added User: 
            ${JSON.stringify(username)}\t
            ${JSON.stringify(success)}\n`,
          err => {
            if (err) throw err;
          }
        );
        console.log(success);
        res.redirect("/login");
      });
    }
  });
});

module.exports = router;
