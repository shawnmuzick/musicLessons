import express from "express";
import teacherModel from "./TeacherModel.js";

const router = express.Router();

router.get("/api", (req, res) => {
  console.log("get api test");
  res.send("test");
});
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
    res.json([data]);
  });
});
router.post("/api/teachers/:id", (req, res) => {
  const { teacher, lessons, newEvent } = req.body;
  lessons.push(newEvent);

  teacherModel
    .update({ name: teacher }, { $set: { lessons: lessons } })
    .exec((err, data) => {
      if(err) throw err;
      res.send(data);
    });
});
export default router;
