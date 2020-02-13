import React from "react";
import axios from "axios";
import { Student } from "../objects";
export default function StuCont({ students, teacher, setStudents }) {
  const handleClick = () => {
    console.log("test");
    if (!teacher.fname) {
      window.alert("Please select an instructor below");
      return;
    } else {
      let s = Student.create({});
      if (s.fname === "DEFAULT" || s.fname === null) {
        window.alert("Please fill out all fields as prompted");
        return;
      } else {
        s.teacher.name = teacher.fname;
        s.teacher.lname = teacher.lname;
        axios.post(`/api/students`, { s }).catch(err => console.log(err));
        const arr = [...students, s];
        console.log(arr);
        setStudents(arr);
      }
    }
    return;
  };
  return (
    <div className={"extEvents"} id="extEvents">
      <h2>Students</h2>
      <button id="AddStudent" onClick={handleClick}>
        Add New
      </button>
      {students
        .filter(s => s.teacher.name === teacher.fname)
        .map(s => (
          <div
            className="fc-event"
            title={`${s.fname} ${s.lname}'s ${s.instrument} lesson`}
            key={s.stId}
            id={s.stID}
          >
            {`${s.fname} ${s.lname}`}
          </div>
        ))}
    </div>
  );
}
