import express from "express";
import teacherModel from "./TeacherModel.js";
import uuidv4 from "uuid";
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
  newEvent.id = uuidv4.v4();
  lessons.push(newEvent);

  teacherModel
    .updateOne({ name: teacher }, { $set: { lessons: lessons } })
    .exec((err, data) => {
      if (err) throw err;
      res.send(data);
    });
});
router.put("/api/update/:id", (req, res) => {
  const reqid = req.params.id;
  const update = req.body.update;
  teacherModel
    .findOne({ lessons: { $elemMatch: { id: reqid } } })
    .exec((err, data) => {
      if (err) throw err;
      const newlessons = data.lessons.map(item => {
        if (item.id === reqid) {
          item.start = update.range.start;
          item.end = update.range.end;
          item.id = reqid;
          return item;
        } else {
          return item;
        }
      });
      console.log(newlessons)
      teacherModel
        .updateOne({ name: data.name }, { $set: { lessons: newlessons } })
        .exec((err, success) => {
          if (err) throw err;
          console.log(success);
        });
    });
});
export default router;
