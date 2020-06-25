import React, { useEffect } from "react";
import { Modal } from "../../components/";
import { FrmNewStudent, FrmDelete } from "../../forms/";
import { fetches, filters, maps, Teacher } from "../../util/";
import FcDraggable from "./FcDraggable";
export default function StuCont({ students, teacher, setTeacher }) {
  useEffect(() => {
    FcDraggable();
    //leave the empty array in the dependencies or you'll get infinite postings
  }, []);

  const handleClick = (s, img) => {
    if (!teacher.fname) return window.alert("Please select an instructor below");
    if (s.fname === "" || s.fname === null) return window.alert("Please fill out all fields as prompted");
    s.teacher.name = teacher.fname;
    s.teacher.lname = teacher.lname;
    s.teacher._id = teacher._id;
    s.img = img;
    fetches.postStudent(s);
  };
  const removeStudent = (_id) => {
    fetches.deleteStudentById(_id).then(() => {
      const t = new Teacher(teacher);
      setTeacher(t);
    });
  };
  const renderStudents = () => {
    return filters.studentsByTeacher(students, teacher).map((s) => (
      <div className="extWrapper" key={s._id}>
        <div
          className="fc-event"
          key={s._id}
          title={`${s.fname} ${s.lname}'s ${s.instrument} lesson`}
          id={s._id}
          instrument={s.instrument}
          rate={s.tuition}>
          <Modal
            managed={true}
            btnTxt={`${s.fname} ${s.lname} `}
            headerTxt={`${s.fname} ${s.lname} `}
            imgSrc={`/assets/img/students/${s._id}.jpg`}>
            {maps.iterateProps(s)}
            <Modal managed={true} btnTxt={"Remove Student"} headerTxt={"Remove Student"}>
              <FrmDelete fname={s.fname} lname={s.lname} id={s._id} fn={removeStudent} />
            </Modal>
          </Modal>
        </div>
      </div>
    ));
  };
  return (
    <div className={"extEvents"} id="extEvents">
      <h2>Students</h2>
      <Modal managed={true} btnTxt={"Add New Student"} headerTxt={"Add New Student"}>
        <FrmNewStudent handleClick={handleClick} />
      </Modal>
      {renderStudents()}
    </div>
  );
}
