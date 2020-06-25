const express = require("express");
const teacherCtrl = require("../controllers/teachers");
const lessonsCtrl = require("../controllers/lessons");
const studentCtrl = require("../controllers/students");
const userCtrl = require("../controllers/users");
const authCtrl = require("../controllers/auth");
const urlEncodedParser = express.urlencoded({ extended: true, limit: "50mb" });
const jsonParser = express.json({ limit: "50mb" });
const apiRouter = express.Router();
const logger = (req, res, next) => {
    console.log("/users requester");
    next();
};
//Teachers------------------------------------------------------------------------------
apiRouter.get("/teachers", teacherCtrl.getTeachers);
apiRouter.get("/teachers:id", teacherCtrl.getTeachers);
apiRouter.post("/teachers", urlEncodedParser, jsonParser, teacherCtrl.postTeacher);
apiRouter.put("/teachers:id", urlEncodedParser, jsonParser, teacherCtrl.updateTeacher);
apiRouter.delete("/teachers:id", teacherCtrl.deleteTeacher);
//Students-------------------------------------------------------------------------------
apiRouter.get("/students", studentCtrl.getStudents);
apiRouter.get("/students:id", studentCtrl.getStudents);
apiRouter.post("/students", urlEncodedParser, jsonParser, studentCtrl.postStudents);
apiRouter.put("/students:id", studentCtrl.updateStudents);
apiRouter.delete("/students:id", studentCtrl.deleteStudents);
//Lessons--------------------------------------------------------------------------------
apiRouter.get("/lessons", lessonsCtrl.getLessons);
apiRouter.get("/lessons:id", lessonsCtrl.getLessons);
apiRouter.post("/lessons", urlEncodedParser, jsonParser, lessonsCtrl.postLessons);
apiRouter.put("/lessons", urlEncodedParser, jsonParser, lessonsCtrl.updateLessons);
apiRouter.delete("/lessons:id", lessonsCtrl.deleteLessons);
//users-----------------------------------------------------------------------------------
apiRouter.get("/users", logger, authCtrl.isLoggedIn, logger, userCtrl.getUsers);
apiRouter.get("/init", authCtrl.isLoggedIn, (req, res) => {
    console.log(req.user);
    res.send(req.user);
});
// apiRouter.get();
// apiRouter.post();
// apiRouter.put();
// apiRouter.delete();

module.exports = apiRouter;
