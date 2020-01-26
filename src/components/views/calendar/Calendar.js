import React, { useEffect, useState } from "react";
import { FullCalendar, plugins } from "./plugins";
import { handler, makeButtons, eventDrop, eventClick, Teacher, Student} from "./functions";
import "./calendar.css";
import axios from 'axios';
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

  useEffect(() => {
    axios
      .get("/api/teachers")
      .then(res => {
        const a = res.data.map(t => {
          return Teacher.create(t);
        });
        setSRC(a);
      })
      .catch(err => console.log(err));
      axios
      .get("/api/students")
      .then(res => {
        const b = res.data.map(s => {
          return Student.create(s);
        });
        setStudents(b);
      })
      .catch(err => console.log(err));
}, [setTeacher, teacher]);
  useEffect(() => {
    footer.center = "";
  });
  return (
    <div className="view">
        <h1>{teacher.name|| <br />}</h1>
      <div className="wrapper">
        <FullCalendar
          customButtons={makeButtons(SRC, footer, teacher, setTeacher, students)}
          dateClick={args => handler(args, calendarRef, teacher, setTeacher)}
          eventClick = {e => eventClick(e, teacher, setTeacher)}
          changeView={args => handler(args, calendarRef, teacher, setTeacher)}
          eventDrop={edit => eventDrop(edit, teacher, setTeacher)}
          eventResize={edit => eventDrop(edit, teacher, setTeacher)}
          ref={calendarRef}
          footer={footer}
          header={header}
          plugins={plugins}
          events={teacher.lessons}
          businessHours={teacher.hours}
          eventLimit={3}
          navLinks={true}
          eventDurationEditable={true}
          eventStartEditable={true}
          eventOverlap={false}
          selectable={true}
          editable={true}
          allDayDefault={false}
          height={"parent"}
          timeZone={"UTC"}
          defaultTimedEventDuration={{minutes:30}}
        />
      </div>
    </div>
  );
}
