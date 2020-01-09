import express from "express";
import teacherModel from "./TeacherModel.js";
import uuidv4 from "uuid";
import fs from "fs";

const router = express.Router();

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
  const { name, phone, lessons = [] } = req.body;
  const newTeacher = new teacherModel({
    name,
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
router.put("/api/update/lesson", (req, res) => {
  const { update, name, id } = req.body;
  const { start, end } = update.range;
  teacherModel
    .updateOne(
      //find where name = name, and lessons's child element that matches id
      { name: name, lessons: { $elemMatch: { id: id } } },
      //set the first child of lessons that matches id, to {stuff in here}
      {
        $set: {
          "lessons.$": {
            id: id,
            start,
            end,
            backgroundColor: update.backgroundColor,
            borderColor: update.borderColor
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
      res.json(success);
    });
});
router.put("/api/update/teacher", (req, res) => {
  const { name, phone, hours } = req.body;
  console.log(hours)
  teacherModel
    .updateOne(
      { name: name },
      {
        $set: {
          "phone": phone,
          "hours": hours
        }
      }
    )
    .exec((err, success) => {
      if (err) throw err;
       res.json(success);
    });
});
export default router;
