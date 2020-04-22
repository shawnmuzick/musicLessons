const { studentModel } = require("../models");
const fs = require("fs");

const studentCtrl = {
  getStudents: (req, res) => {
    if (req.params.id) {
      studentModel.findOne({ _id: req.params.id }).exec((err, data) => {
        if (err) throw err;
        res.json(data);
      });
    } else {
      studentModel.find().exec((err, data) => {
        if (err) throw err;
        res.json(data);
      });
    }
  },
  postStudents: (req, res) => {
    const { s, img } = req.body;
    delete s._id;
    const newStudent = new studentModel(s);
    newStudent.save((err, success) => {
      if (err) throw err;
      if (!fs.existsSync("./logs")) {
        fs.mkdirSync("./logs");
        fs.mkdirSync("./public/img/students");
      }
      fs.writeFile(`./public/img/students/${success._id}.jpg`, img, { encoding: "base64" }, (err) => {
        if (err) throw err;
      });
      fs.appendFile("./logs/students.txt", `Added Student: ${JSON.stringify(success)}\n`, (err) => {
        if (err) throw err;
      });
      console.log(success);
      res.json(success);
    });
  },
  updateStudents: (req, res) => {
    //placeholder
  },
  deleteStudents: (req, res) => {
    studentModel.findByIdAndDelete({ _id: req.params.id }).exec((err, success) => {
      if (err) throw err;
      fs.unlink(`./public/img/students/${req.params.id}.jpg`, (err) => {
        if (err) throw err;
      });
      console.log(success);
      res.json(success);
    });
  },
};
module.exports = studentCtrl;
