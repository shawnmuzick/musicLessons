import express from "express";
import { teacherModel, studentModel } from "./models.js";
import uuidv4 from "uuid";
import fs from "fs";

const router = express.Router();
//Interface--------------------------------------------------------------
router.get("/login", (req, res) => {
  //use ejs to render a simple login page
  //fill in here after install and design
});

//Teachers-----------------------------------------------------------------------------------------
router.get("/api/teachers", (req, res) => {
  teacherModel.find().exec((err, data) => {
    if (err) throw err;
    res.json(data);
  });
});
router.get("/api/teachers/:id", (req, res) => {
  const fname = req.params.id;
  teacherModel.findOne({ fname: fname }).exec((err, data) => {
    if (err) throw err;
    res.json(data);
  });
});
router.post("/api/teachers", (req, res) => {
  const { fname, lname, phone, lessons = [], img } = req.body;
  const newTeacher = new teacherModel({
    fname,
    lname,
    phone,
    lessons
  });
  newTeacher.save((err, success) => {
    if (err) throw err;
    if (!fs.existsSync("./server/logs")) {
      fs.mkdirSync("./server/logs");
    }
    fs.writeFile(
      `./public/img/faculty/${success._id}.jpg`,
      img,
      { encoding: "base64" },
      function() {
        console.log("Saved Img!");
      }
    );
    fs.appendFile(
      "./server/logs/teacher_new.txt",
      `Added Teacher: 
        ${JSON.stringify(fname)}\t
        ${JSON.stringify(success)}\n`,
      err => {
        if (err) throw err;
      }
    );
    console.log(success);
    res.json(success);
  });
});
router.put("/api/update/teacher", (req, res) => {
  const { _id, phone, hours } = req.body;
  teacherModel
    .updateOne(
      { _id: _id },
      {
        $set: {
          phone: phone,
          hours: hours
        }
      }
    )
    .exec((err, success) => {
      if (err) throw err;
      console.log(success);
      res.json(success);
    });
});
router.delete("/api/teachers:id", (req, res) => {
  teacherModel
    .findByIdAndDelete({ _id: req.params.id })
    .exec((err, success) => {
      if (err) throw err;
      console.log(success);
      res.json(success);
    });
  fs.unlink(`./public/img/faculty/${req.params.id}.jpg`, err => {
    if (err) console.log(err);
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
  const { s, img } = req.body;
  delete s._id;
  const newStudent = new studentModel(s);
  newStudent.save((err, success) => {
    if (err) throw err;
    if (!fs.existsSync("./server/logs")) {
      fs.mkdirSync("./server/logs");
      fs.mkdirSync("./public/img/students");
    }
    fs.writeFile(
      `./public/img/students/${success._id}.jpg`,
      img,
      { encoding: "base64" },
      function() {
        console.log("Saved Img!");
      }
    );
    fs.appendFile(
      "./server/logs/newStudent.txt",
      `Added Student: ${JSON.stringify(success)}\n`,
      err => {
        if (err) throw err;
      }
    );
    console.log(success);
    res.json(success);
  });
});
router.put("/api/update/student/lesson", (req, res) => {
  const {
    start,
    end,
    id,
    title,
    backgroundColor,
    borderColor,
    instrument,
    icon,
    rate
  } = req.body.event;
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
            rate
          }
        }
      }
    )
    .exec((err, success) => {
      if (err) throw err;
      if (!fs.existsSync("./server/logs")) {
        fs.mkdirSync("./server/logs");
      }
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
      console.log(success);
      res.json(success);
    });
});
router.delete("/api/students:id", (req, res) => {
  studentModel
    .findByIdAndDelete({ _id: req.params.id })
    .exec((err, success) => {
      if (err) throw err;
      console.log(success);
      res.json(success);
    });
  fs.unlink(`./public/img/students/${req.params.id}.jpg`, err => {
    if (err) console.log(err);
  });
});
//Lessons--------------------------------------------------------------------------------
router.post("/api/lesson", (req, res) => {
  console.log("test");
  const { event, stID } = req.body;
  const {
    start,
    end,
    id,
    title,
    backgroundColor,
    borderColor,
    instrument,
    icon,
    rate
  } = event;
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
            rate
          }
        }
      }
    )
    .exec((err, success) => {
      if (err) throw err;
      if (!fs.existsSync("./server/logs")) {
        fs.mkdirSync("./server/logs");
      }
      fs.appendFile(
        "./server/logs/lesson.txt",
        ` Added ID: ${JSON.stringify(id)}\t${JSON.stringify(success)}\n`,
        err => {
          if (err) throw err;
        }
      );
      console.log(success);
      res.json(success);
    });
});

export default router;
