import React, { useEffect, useState } from "react";
import { Student } from "../classes";
import ReactFullCalendar from "./ReactFullCalendar";
import StuCont from "./stuCont";
import FcDraggable from "./FcDraggable";
import "./calendar.css";
import axios from "axios";
export default function Calendar({ SRC, students, setStudents }) {
  const calendarRef = React.createRef();
  const [teacher, setTeacher] = useState({});
  const header = {
    left: "prev,next, today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay"
  };
  const footer = {
    center: ""
  };
  //On First Render----------------------------------------------------------------
  useEffect(() => {
    FcDraggable();
    //you have to leave the empty array in the dependencies
    //or you'll get infinite postings
  }, []);
  //whenever the current teacher changes, rerender, fetch students,
  useEffect(() => {
    //you need this to clean out what was in here previously
    teacher.lessons = [];
    axios
      .get("/api/students")
      .then(res => {
        const b = res.data.map(s => {
          return new Student(s);
        });
        setStudents(b);
      })
      .catch(err => console.log(err));
  }, [teacher, setStudents]);
  const makeButtons = () => {
    //This links students and their teachers
    students.forEach(s => {
      if (
        teacher.fname === s.teacher.name &&
        teacher.lname === s.teacher.lname
      ) {
        s.lessons.forEach(l => {
          teacher.lessons.push(l);
        });
      }
    });
    let obj = SRC.reduce((obj, item) => {
      obj[item.lname] = item;
      item.click = function() {
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
      <h1>{teacher.fname ? `${teacher.fname} ${teacher.lname}` : <br />}</h1>
      <hr />
      <div className="wrapper" id="CalendarWrap">
        <StuCont students={students} teacher={teacher} setTeacher={setTeacher}/>
        <div className="spacer"/>
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
