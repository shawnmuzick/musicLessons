import React from "react";
import axios from "axios";
import { Student } from "../classes";
import Button from "../../buttons/Button";
export default function StuCont({ students, teacher, setStudents }) {
  const handleClick = () => {
    if (!teacher.fname) {
      window.alert("Please select an instructor below");
      return;
    } else {
      let s = new Student({});
      if (s.fname === "DEFAULT" || s.fname === null) {
        window.alert("Please fill out all fields as prompted");
        return;
      } else {
        s.teacher.name = teacher.fname;
        s.teacher.lname = teacher.lname;
        axios.post(`/api/students`, { s }).catch(err => console.log(err));
        const arr = [...students, s];
        setStudents(arr);
      }
    }
    return;
  };
  return (
    <div className={"extEvents"} id="extEvents">
      <h2>Students</h2>
      <Button name={"Add New"} fn={handleClick} />
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
