import React, { useEffect, useState } from "react";
import { Draggable } from "./plugins";
import { Teacher, Student } from "../classes";
import ReactFullCalendar from "./ReactFullCalendar";
import StuCont from "./stuCont";
import "./calendar.css";
import axios from "axios";
export default function Calendar() {
  const calendarRef = React.createRef();
  const [teacher, setTeacher] = useState({});
  const [students, setStudents] = useState([]);
  const [SRC, setSRC] = useState([]);
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
    axios
      .get("/api/teachers")
      .then(res => {
        const a = res.data.map(t => {
          t.lessons = [];
          return new Teacher(t);
        });
        setSRC(a);
      })
      .catch(err => console.log(err));
    let draggableEl = document.getElementById("extEvents");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function(eventEl) {
        let title = eventEl.getAttribute("title");
        let _id = eventEl.getAttribute("id");
        return {
          allDay: false,
          title: title,
          _id: _id,
          // you need this parameter to avoid duplicates!!!
          create: false
        };
      }
    });
  }, []);
  //whenever the current teacher changes, rerender, fetch students,
  useEffect(() => {
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
  }, [teacher]);

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
        <StuCont
          students={students}
          teacher={teacher}
        />
        <div className="spacer"></div>

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
