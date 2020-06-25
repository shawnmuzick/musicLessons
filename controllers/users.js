const { userModel } = require("../models");
const fc = require("fs");

const userCtrl = {
  getUsers: (req, res, next) => {
    console.log('getusers');
    if (req.params.id) {
      userModel.findOne({ _id: req.params.id }).exec((err, data) => {
        if (err) throw err;
        res.json(data);
        return next();
      });
    } else {
      userModel.find().exec((err, data) => {
        console.log('find')
        console.log(data);
        if (err) throw err;
        res.json(data);
        return next();
      });
    }
  },
  postUsers: (req, res) => {},
  putUsers: (req, res) => {},
  deleteUsers: (req, res) => {},
};

module.exports = userCtrl;
