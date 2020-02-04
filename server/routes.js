import express from "express";
import { teacherModel, studentModel } from "./models.js";
import uuidv4 from "uuid";
import fs from "fs";

const router = express.Router();
//Teachers-----------------------------------------------------------------------------------------
router.get("/api/teachers", (req, res) => {
  teacherModel.find().exec((err, data) => {
    if (err) throw err;
    res.json(data);
  });
});
router.get("/api/teachers/:id", (req, res) => {
  const name = req.params.id;
  teacherModel.findOne({ name: name }).exec((err, data) => {
    if (err) throw err;
    res.json(data);
  });
});
router.post("/api/teachers", (req, res) => {
  const { name, lname, phone, lessons = [] } = req.body;
  const newTeacher = new teacherModel({
    name,
    lname,
    phone,
    lessons
  });
  newTeacher.save((err, success) => {
    if (err) throw err;
    fs.appendFile(
      "./server/logs/newTeacherLog.txt",
      "Added Teacher: " +
        JSON.stringify(name) +
        "\t" +
        JSON.stringify(success) +
        "\n",
      err => {
        if (err) throw err;
      }
    );
    res.json(success);
  });
});
router.put("/api/update/teacher", (req, res) => {
  const { name, phone, hours } = req.body;
  console.log(hours);
  teacherModel
    .updateOne(
      { name: name },
      {
        $set: {
          phone: phone,
          hours: hours
        }
      }
    )
    .exec((err, success) => {
      if (err) throw err;
      res.json(success);
    });
});
//Students-------------------------------------------------------------------------------
router.get("/api/students", (req, res) => {
  studentModel.find().exec((err, data) => {
    if (err) throw err;
    res.json(data);
  });
});
router.post("/api/students", (req, res) => {
  const {s} = req.body;
  const newStudent = new studentModel(s);
  newStudent.save((err, success) => {
    if (err) throw err;
    fs.appendFile(
      "./server/logs/newStudent.txt",
      "Added Student: " +
        JSON.stringify(s.stID) +
        "\t" +
        JSON.stringify(success) +
        "\n",
      err => {
        if (err) throw err;
      }
    );
    res.json(success);
  });
});
router.put("/api/update/student/lesson", (req, res) => {
  const { event, stID } = req.body;
  const { start, end, id, title, backgroundColor, borderColor } = event;
  if (id === null || id ==='') {
    let newid = uuidv4.v4();
    studentModel
      .updateOne(
        //find where lessons's child element that matches id
        { stID: stID },
        {
          $push: {
            lessons: {
              title,
              id:newid,
              start,
              end,
              backgroundColor,
              borderColor
            }
          }
        }
      )
      .exec((err, success) => {
        if (err) throw err;
        fs.appendFile(
          "./server/logs/updateLog.txt",
          " Updated ID: " +
            JSON.stringify(id) +
            "\t" +
            JSON.stringify(success) +
            "\n",
          err => {
            if (err) throw err;
          }
        );
        console.log(success)
        res.json(success);
      });
  } else {
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
              borderColor
            }
          }
        }
      )
      .exec((err, success) => {
        if (err) throw err;
        fs.appendFile(
          "./server/logs/updateLog.txt",
          " Updated ID: " +
            JSON.stringify(id) +
            "\t" +
            JSON.stringify(success) +
            "\n",
          err => {
            if (err) throw err;
          }
        );
        console.log(success)
        res.json(success);
      });
  }
});
//Lessons--------------------------------------------------------------------------------
router.post("/api/newLesson", (req, res) => {
  const { teacher, newEvent } = req.body;
  newEvent.id = uuidv4.v4();

  teacherModel
    .updateOne({ name: teacher }, { $push: { lessons: newEvent } })
    .exec((err, data) => {
      if (err) throw err;
      fs.appendFile(
        "./server/logs/newLessonLog.txt",
        "Added ID: " + JSON.stringify(newEvent.id) + "\n",
        err => {
          if (err) throw err;
        }
      );
      res.send({ data: data, id: newEvent.id });
    });
});

export default router;
