const { studentModel } = require("../models");
const uuidv4 = require("uuid");
const fs = require("fs");
const lessonsCtrl = {
  getLessons: (req, res) => {
    if (req.params.id) {
    } else {
    }
    //placeholder
  },
  postLessons: (req, res) => {
    const { event, stID } = req.body;
    const { start, end, id, title, backgroundColor, borderColor, instrument, icon, rate } = event;
    let newid = uuidv4.v4();
    studentModel
      .updateOne(
        //find where lessons's child element that matches id
        { _id: stID },
        {
          $push: {
            lessons: {
              title,
              id: newid,
              start,
              end,
              backgroundColor,
              borderColor,
              instrument,
              icon,
              rate,
            },
          },
        }
      )
      .exec((err, success) => {
        if (err) throw err;
        if (!fs.existsSync("../server/logs")) {
          fs.mkdirSync("../server/logs");
        }
        fs.appendFile(
          "../server/logs/lesson.txt",
          ` Added ID: ${JSON.stringify(id)}\t${JSON.stringify(success)}\n`,
          (err) => {
            if (err) throw err;
          }
        );
        console.log(success);
        res.json(success);
      });
  },
  updateLessons: (req, res) => {
    const { start, end, id, title, backgroundColor, borderColor, instrument, icon, rate } = req.body.event;
    studentModel
      .updateOne(
        //find where lessons's child element that matches id
        { lessons: { $elemMatch: { id: id } } },
        //set the first child of lessons that matches id, to {stuff in here}
        {
          $set: {
            "lessons.$": {
              title,
              id,
              start,
              end,
              backgroundColor,
              borderColor,
              instrument,
              icon,
              rate,
            },
          },
        }
      )
      .exec((err, success) => {
        if (err) throw err;
        if (!fs.existsSync("../server/logs")) {
          fs.mkdirSync("../server/logs");
        }
        fs.appendFile(
          "../server/logs/lesson.txt",
          `Updated ID: ${JSON.stringify(id)}\t${JSON.stringify(success)}\n`,
          (err) => {
            if (err) throw err;
          }
        );
        console.log(success);
        res.json(success);
      });
  },
  deleteLessons: (req, res) => {
    //placeholder
  },
};

module.exports = lessonsCtrl;
