import React, {useContext} from "react";
import {TeacherContext} from '../../contexts/teachers';
import EmpDetails from "./EmpDetails"
export default function FacultyView() {
const teachers = useContext(TeacherContext)
console.log(teachers);

  return (
    <div id="FacultyView" className={"view"}>
      <h2>Faculty</h2>
      {teachers.map(teacher => (
        <EmpDetails key = {teacher.id} teacher = {teacher}/>
      ))}
    </div>
  );
}
