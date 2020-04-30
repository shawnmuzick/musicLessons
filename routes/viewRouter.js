const express = require("express");
const fs = require("fs");
const { userModel } = require("../models");
const passport = require("passport");
const bcrypt = require("bcrypt");
const bodyParser = express.urlencoded({ extended: true, limit: "50mb" });
const jsonParser = express.json({ limit: "50mb" });
const router = express.Router();
const saltRounds = 10;
//Interface--------------------------------------------------------------
router.get("/login", (req, res) => {
  res.render("login");
});
router.post(
  "/login",
  bodyParser,
  jsonParser,
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    if (req.user) {
      const date = new Date();
      console.log(`User ID:${req.user._id} logged in at ${date}`);
      res.json(req.user);
    }
  }
);
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", bodyParser, jsonParser, (req, res) => {
  const { username, password, fname, lname } = req.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err;
    if (hash) {
      let newUser = new userModel({
        username,
        password: hash,
        fname,
        lname,
        role: "user",
      });
      newUser.save((err, success) => {
        if (err) throw err;
        if (!fs.existsSync("./logs")) {
          fs.mkdirSync("./logs");
        }
        fs.appendFile(
          "./logs/users.txt",
          `Added User: 
            ${JSON.stringify(username)}\t
            ${JSON.stringify(success)}\n`,
          (err) => {
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
