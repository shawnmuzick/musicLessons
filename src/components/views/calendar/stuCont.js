import React from "react";
import axios from "axios";
import PopModal from "../../modal/index";
import FrmNewStudent from "../../forms/FrmNewStudent";
import FrmDeleteStudent from "../../forms/FrmDeleteStudent";
import { Teacher } from "../classes";

export default function StuCont({ students, teacher, setTeacher }) {
  const handleClick = s => {
    if (!teacher.fname) {
      window.alert("Please select an instructor below");
      return;
    } else {
      if (s.fname === "DEFAULT" || s.fname === null) {
        window.alert("Please fill out all fields as prompted");
        return;
      } else {
        s.teacher.name = teacher.fname;
        s.teacher.lname = teacher.lname;
        axios.post(`/api/students`, { s }).catch(err => console.log(err));
      }
    }
    return;
  };
  const removeStudent = _id => {
    axios.delete(`/api/students${_id}`).catch(err => console.log(err));
    const t = new Teacher(teacher);
    setTeacher(t);
  };
  return (
    <div className={"extEvents"} id="extEvents">
      <h2>Students</h2>
      <PopModal prompt={"Add New Student"}>
        <FrmNewStudent handleClick={handleClick} />
      </PopModal>
      {students
        .filter(s => s.teacher.name === teacher.fname)
        .map(s => (
          <div className="extWrapper" key={s._id}>
            <PopModal prompt={"Remove Student"} bName={"x"}>
              <FrmDeleteStudent
                fname={s.fname}
                lname={s.lname}
                id={s._id}
                fn={removeStudent}
              />
            </PopModal>
            <div
              className="fc-event"
              title={`${s.fname} ${s.lname}'s ${s.instrument} lesson`}
              key={s._id}
              id={s._id}
            >
              {`${s.fname} ${s.lname}`}
            </div>
          </div>
        ))}
    </div>
  );
}
