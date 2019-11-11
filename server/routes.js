import express from "express";
import teacherModel from './TeacherModel.js';

const router = express.Router();

router.get("/api", (req, res) => {
  console.log("get api test");
  res.send("test");
});
router.get("/api/teachers",(req,res)=>{
  teacherModel.find().exec((err,data)=>{
    if(err) throw err;
    res.json(data);
  })
})
export default router;
