import React, { useState } from "react";
import axios from "axios";
import PopModal from "../../modal/index";
import FrmNewStudent from "../../forms/FrmNewStudent";
import FrmDeleteStudent from "../../forms/FrmDeleteStudent";
import { Teacher } from "../classes";
import Modal from "@material-ui/core/Modal";
import Button from "../../buttons/Button";
export default function StuCont({ students, teacher, setTeacher }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (s, img) => {
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
        axios.post(`/api/students`, { s, img }).catch(err => console.log(err));
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
            <Modal open={open} className={"modal"}>
              <div className={"modalWrapper"}>
                <div className="modalHeader">
                  <img
                    src={`/img/students/${s._id}.jpg`}
                    alt={`${s.fname} ${s.lname}`}
                  />
                  <h2>
                    {s.fname}
                    <br />
                    {s.lname}
                  </h2>
                  <Button name={"x"} fn={handleClose} />
                </div>
                {/* walk the student's properties */}
                {Object.keys(s).map(key => {
                  // except for the 'lessons' property
                  if (key !== "lessons") {
                    return <p>{`${key}: ${s[key]}`}</p>;
                  }else{
                    return null;
                  }
                })}
              </div>
            </Modal>
            <div
              className="fc-event"
              title={`${s.fname} ${s.lname}'s ${s.instrument} lesson`}
              key={s._id}
              id={s._id}
              instrument={s.instrument}
              rate={s.tuition}
              onClick={handleOpen}
            >
              {`${s.fname} ${s.lname}`}
            </div>
          </div>
        ))}
    </div>
  );
}
