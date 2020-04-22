import React, { useState, useEffect } from "react";
import axios from "axios";
import { PopModal } from "../../../components/";
import { FrmNewStudent, FrmDelete } from "../../../forms/";
import { Teacher } from "../../../classes/classes";
import { fetches, filters } from "../../../util/";
import FcDraggable from "./FcDraggable";
export default function StuCont({ students, teacher, setTeacher }) {
  useEffect(() => {
    FcDraggable();
    //leave the empty array in the dependencies or you'll get infinite postings
  }, []);

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
        s.teacher._id = teacher._id;
        axios.post(`/api/students`, { s, img }).catch((err) => console.log(err));
      }
    }
    return;
  };
  const removeStudent = (_id) => {
    fetches.deleteStudentById(_id).then(() => {
      const t = new Teacher(teacher);
      setTeacher(t);
    });
  };
  const renderStudents = () => {
    return filters.studentsByTeacher(students, teacher).map((s) => (
      <div className="extWrapper">
        <div
          className="fc-event"
          key={s._id}
          title={`${s.fname} ${s.lname}'s ${s.instrument} lesson`}
          key={s._id}
          id={s._id}
          instrument={s.instrument}
          rate={s.tuition}>
          <PopModal prompt={`${s.fname} ${s.lname} `} className={"modal"} imgSrc={`/assets/img/students/${s._id}.jpg`}>
            <div className={"modalWrapper"}>
              {/* walk the student's properties */}
              {Object.keys(s).map((key) => {
                // except for the 'lessons' property
                if (key !== "lessons") {
                  return <p>{`${key}: ${s[key]}`}</p>;
                } else {
                  return null;
                }
              })}
              <PopModal prompt={"Remove Student"}>
                <FrmDelete fname={s.fname} lname={s.lname} id={s._id} fn={removeStudent} />
              </PopModal>
            </div>
          </PopModal>
        </div>
      </div>
    ));
  };
  return (
    <div className={"extEvents"} id="extEvents">
      <h2>Students</h2>
      <PopModal prompt={"Add New Student"}>
        <FrmNewStudent handleClick={handleClick} />
      </PopModal>
      {renderStudents()}
    </div>
  );
}
