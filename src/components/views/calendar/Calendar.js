import React, { useEffect, useState } from "react";
import { fetches, maps } from "../../../util";
import { Header } from "../../../components/";
import ReactFullCalendar from "./ReactFullCalendar";
import StuCont from "./stuCont";
import "./calendar.css";
export default function Calendar({ SRC, students, setStudents }) {
  const calendarRef = React.createRef();
  const [teacher, setTeacher] = useState({});
  const header = {
    left: "prev,next, today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  };
  const footer = {
    center: "",
  };

  useEffect(() => {
    //whenever the current teacher changes, rerender, fetch students, clean lessons array
    teacher.lessons = [];
    fetches
      .getStudents()
      .then((res) => setStudents(res))
      .catch((err) => console.log(err));
  }, [teacher, setStudents]);
  const makeButtons = () => {
    //This links students and their teachers
    maps.addTeacherLessons(students, teacher);
    let obj = SRC.reduce((obj, item) => {
      obj[item.lname] = item;
      item.click = function () {
        item.lessons = [];
        setTeacher(item);
      };
      footer.center += `${item.lname},`;
      return obj;
    }, {});
    return obj;
  };
  return (
    <div className="view">
      <Header>
        <div className="calendarHeader">
          {teacher._id ? (
            <img src={`/assets/img/faculty/${teacher._id}.jpg`} alt={`${teacher.fname} ${teacher.lname}`} />
          ) : (
            <br />
          )}
          {teacher._id ? <h1>{`${teacher.fname} ${teacher.lname}`}</h1> : <h1 style={{ margin: "auto" }}>Welcome</h1>}
        </div>
      </Header>

      <div className="wrapper" id="CalendarWrap">
        <StuCont students={students} teacher={teacher} setTeacher={setTeacher} />
        <div className="spacer" />
        <ReactFullCalendar
          calendarRef={calendarRef}
          teacher={teacher}
          setTeacher={setTeacher}
          makeButtons={makeButtons}
          header={header}
          footer={footer}
        />
      </div>
    </div>
  );
}
