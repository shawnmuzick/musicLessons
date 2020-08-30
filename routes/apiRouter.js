const express = require('express');
const teacherCtrl = require('../controllers/teachers');
const lessonsCtrl = require('../controllers/lessons');
const studentCtrl = require('../controllers/students');
const userCtrl = require('../controllers/users');
const authCtrl = require('../controllers/auth');
const urlEncodedParser = express.urlencoded({ extended: true, limit: '50mb' });
const jsonParser = express.json({ limit: '50mb' });
const apiRouter = express.Router();

//Teachers------------------------------------------------------------------------------
apiRouter.get('/teachers', teacherCtrl.getTeachers);
apiRouter.get('/teachers:id', teacherCtrl.getTeachers);
apiRouter.post('/teachers', urlEncodedParser, jsonParser, teacherCtrl.postTeacher);
apiRouter.put('/teachers', urlEncodedParser, jsonParser, teacherCtrl.updateTeacher);
apiRouter.delete('/teachers:id', teacherCtrl.deleteTeacher);
//Students-------------------------------------------------------------------------------
apiRouter.get('/students', studentCtrl.getStudents);
apiRouter.get('/students:id', studentCtrl.getStudents);
apiRouter.post('/students', urlEncodedParser, jsonParser, studentCtrl.postStudents);
apiRouter.put('/students', studentCtrl.updateStudents);
apiRouter.delete('/students:id', studentCtrl.deleteStudents);
//Lessons--------------------------------------------------------------------------------
apiRouter.get('/lessons', lessonsCtrl.getLessons);
apiRouter.get('/lessons:id', lessonsCtrl.getLessons);
apiRouter.post('/lessons', urlEncodedParser, jsonParser, lessonsCtrl.postLessons);
apiRouter.put('/lessons', urlEncodedParser, jsonParser, lessonsCtrl.updateLessons);
apiRouter.delete('/lessons:id', lessonsCtrl.deleteLessons);
//users-----------------------------------------------------------------------------------
apiRouter.get('/users', authCtrl.isLoggedIn, userCtrl.getUsers);
apiRouter.get('/users:id', authCtrl.isLoggedIn, userCtrl.getUsers);
apiRouter.post('/users', authCtrl.isLoggedIn, userCtrl.postUsers);
apiRouter.put('/users', authCtrl.isLoggedIn, userCtrl.putUsers);
apiRouter.delete('/users:id', authCtrl.isLoggedIn, userCtrl.deleteUsers);
//init-------------------------------------------------------------------------------------
apiRouter.get('/init', authCtrl.isLoggedIn, (req, res) => {
	console.log(req.user);
	res.send(req.user);
});
module.exports = apiRouter;
