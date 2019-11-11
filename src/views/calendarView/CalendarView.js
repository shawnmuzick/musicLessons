import React, { useEffect, useState } from "react";
import { FullCalendar, plugins } from "./plugins";
import { header, footer, eSrc } from "./options";
import { handler, selector } from "./functions";
import "./calendar.css";
export default function CalendarView() {
  const calendarRef = React.createRef();
  const [teacher, setTeacher] = useState('');
  const [events, setEvents] = useState([{}]);
  useEffect(() => {
    footer.left = "";
  }, [events, teacher]);
  const handleClick = args => {
    handler(args, events, setEvents, calendarRef);
  };
  const teacherSelect = (name, events) => {
    selector(name, events, setTeacher, setEvents);
  };
  for (let i in eSrc) {
    if (eSrc.hasOwnProperty(i)) {
      eSrc[i].text = i.toString();
      eSrc[i].click = function() {
        teacherSelect(eSrc[i].text, eSrc[i].lessons);
      };
      footer.left += "," + eSrc[i].text + " ";
    }
  }
  const customButtons = eSrc;
  return (
    <div className="view">
      <h1>{teacher? teacher : (<br />)}</h1>
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
