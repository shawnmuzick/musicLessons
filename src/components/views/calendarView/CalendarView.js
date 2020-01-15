import React, { useEffect, useState } from "react";
import { FullCalendar, plugins } from "./plugins";
import { handler, makeButtons, eventDrop, eventClick} from "./functions";
import "./calendar.css";
export default function CalendarView() {
  const calendarRef = React.createRef();
  // const [params, setParams] = useState({ teacher: "", events: [], hours:[] });
  const [teacher, setTeacher] = useState({});
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
    fetch(`/api/teachers`)
      .then(res => res.json())
      .then(data => {
        setSRC(data);
      })
      .catch(err => console.log("load" + err));
}, [setTeacher, teacher]);
  useEffect(() => {
    footer.center = "";
  });
  return (
    <div className="view">
        <h1>{teacher.name|| <br />}</h1>
      <div className="wrapper">
        <FullCalendar
          customButtons={makeButtons(SRC, footer, teacher, setTeacher)}
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
          selectable={true}
          editable={true}
          allDayDefault={false}
          height={"parent"}
          timeZone={"UTC"}
        />
      </div>
    </div>
  );
}
