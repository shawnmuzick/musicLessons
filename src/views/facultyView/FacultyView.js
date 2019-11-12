import React, {useEffect, useState} from "react";
import EmpDetails from "./EmpDetails"
export default function FacultyView() {
const [teachers, setTeachers] = useState([]);

useEffect(() => {
  fetch("http://localhost:5001/api/teachers")
  .then(res => res.json())
  .then(data=>{console.log(data); setTeachers(data)})
  }, [])

  return (
    <div id="FacultyView" className={"view"}>
      <h2>Faculty</h2>
      {teachers.map(teacher => (
        <EmpDetails key = {teacher._id} teacher = {teacher}/>
      ))}
    </div>
  );
}
