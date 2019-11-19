import React, { useEffect, useState } from "react";
import { FullCalendar, plugins } from "./plugins";
import { header, footer } from "./options";
import { handler, arraytoobject, drop } from "./functions";
import "./calendar.css";
export default function CalendarView() {
  const calendarRef = React.createRef();
  const [teacher, setTeacher] = useState("");
  const [events, setEvents] = useState([]);
  const [SRC, setSRC] = useState([]);
  useEffect(() => {
    fetch(`/api/teachers`)
      .then(res => res.json())
      .then(data => {
        setSRC(data);
      })
      .catch(err => console.log("load" + err));
  }, [setEvents,events]);
  useEffect(() => {
    footer.left = "";
  });
  const handleClick = args => {
    handler(args, events, setEvents, calendarRef, teacher);
  };
  const eventDrop = edit => {
    drop(edit, events, setEvents);
  };

  const customButtons = arraytoobject(
    SRC,
    setTeacher,
    setEvents,
    footer,
    teacher
  );
  return (
    <div className="view">
      <h1>{teacher ? teacher : <br />}</h1>
      <div className="wrapper">
        <FullCalendar
          ref={calendarRef}
          customButtons={customButtons}
          navLinks={true}
          footer={footer}
          header={header}
          selectable={true}
          editable={true}
          dateClick={handleClick}
          changeView={handleClick}
          plugins={plugins}
          events={events}
          eventDrop={eventDrop}
          eventLimit={3}
          eventDurationEditable={true}
          eventStartEditable={true}
          height={"parent"}
          allDayDefault={false}
        />
      </div>
    </div>
  );
}
