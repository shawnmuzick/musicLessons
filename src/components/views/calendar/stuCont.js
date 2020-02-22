import React from "react";
import axios from "axios";
import { Student } from "../classes";
import PopModal from "../../modal/index";
import FrmNewStudent from "../../forms/FrmNewStudent";
export default function StuCont({ students, teacher, setStudents }) {
  const handleClick = (a) => {
    if (!teacher.fname) {
      window.alert("Please select an instructor below");
      return;
    } else {
      let s = new Student(a);
      if (s.fname === "DEFAULT" || s.fname === null) {
        window.alert("Please fill out all fields as prompted");
        return;
      } else {
        s.teacher.name = teacher.fname;
        s.teacher.lname = teacher.lname;
        axios.post(`/api/students`, { s }).catch(err => console.log(err));
        axios
          .get("/api/students")
          .then(res => {
            const b = res.data.map(s => {
              // console.log(s);
              return new Student(s);
            });
            setStudents(b);
            // console.log(b);
          })
          .catch(err => console.log(err));
        const arr = [...students, s];
        setStudents(arr);
      }
    }
    return;
  };
  return (
    <div className={"extEvents"} id="extEvents">
      <h2>Students</h2>
      <PopModal prompt={"Add New"}>
        <FrmNewStudent handleClick={handleClick}/>
      </PopModal>
      {students
        .filter(s => s.teacher.name === teacher.fname)
        .map(s => (
          <div
            className="fc-event"
            title={`${s.fname} ${s.lname}'s ${s.instrument} lesson`}
            key={s._id}
            id={s._id}
          >
            {`${s.fname} ${s.lname}`}
          </div>
        ))}
    </div>
  );
}
