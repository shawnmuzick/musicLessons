import express from "express";
const router = express.Router();
router.get("/api", (req, res) => {
  console.log("get api test");
  res.send("test");
});
router.get("/api/teachers",(req,res)=>{
  res.send("some teacher api request")
})
export default router;
