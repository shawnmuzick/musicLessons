const { teacherModel } = require("../models");
const fs = require("fs");
const teacherCtrl = {
  getTeachers: (req, res) => {
    if (req.params.id) {
      teacherModel.findOne({ _id: req.params.id }).exec((err, data) => {
        if (err) throw err;
        res.json(data);
      });
    } else {
      teacherModel.find().exec((err, data) => {
        if (err) throw err;
        res.json(data);
      });
    }
  },
  postTeacher: (req, res) => {
    const { fname, lname, phone, lessons = [], img } = req.body;
    const newTeacher = new teacherModel({
      fname,
      lname,
      phone,
      lessons,
    });
    newTeacher.save((err, success) => {
      if (err) throw err;
      if (!fs.existsSync("./logs")) {
        fs.mkdirSync("./logs");
      }
      fs.writeFile(`./public/img/faculty/${success._id}.jpg`, img, { encoding: "base64" }, (err) => {
        if (err) throw err;
      });
      fs.appendFile(
        "./logs/teachers.txt",
        `Added Teacher: 
          ${JSON.stringify(fname)}\t
          ${JSON.stringify(success)}\n`,
        (err) => {
          if (err) throw err;
        }
      );
      console.log(success);
      res.json(success);
    });
  },
  updateTeacher: (req, res) => {
    const _id = req.params.id;
    const { phone, hours } = req.body;
    teacherModel
      .updateOne(
        { _id: _id },
        {
          $set: {
            phone: phone,
            hours: hours,
          },
        }
      )
      .exec((err, success) => {
        if (err) throw err;
        console.log(success);
        res.json(success);
      });
  },
  deleteTeacher: (req, res) => {
    teacherModel.findByIdAndDelete({ _id: req.params.id }).exec((err, success) => {
      if (err) throw err;
      fs.unlink(`./public/img/faculty/${req.params.id}.jpg`, (err) => {
        if (err) console.log(err);
      });
      console.log(success);
      res.json(success);
    });
  },
};
module.exports = teacherCtrl;
