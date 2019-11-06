import React, { useEffect, useState } from "react";
import { FullCalendar, plugins } from "./plugins";
import { header, footer, eSrc } from "./options";
import { handler, selector } from "./functions";
import "./calendar.css";

export default function CalendarView() {
  const calendarRef = React.createRef();
  const [teacher, setTeacher] = useState();
  const [events, setEvents] = useState([{}]);
  useEffect(() => {}, [events]);
  useEffect(() => {}, [teacher]);

  const handleClick = args => {
    handler(args, events, setEvents, calendarRef);
  };
  const teacherSelect = (name, events) => {
    selector(name, events, setTeacher, setEvents);
  };
  const customButtons = {
    Brian: {
      text: "Brian",
      click: function() {
        let lessons = eSrc.Brian.lessons;
        teacherSelect("Brian", lessons);
      }
    },
    Chrystal: {
      text: "Chrystal",
      click: function() {
        let lessons = eSrc.Chrystal.lessons;
        teacherSelect("Chrystal", lessons);
      }
    },
    Jeff: {
      text: "Jeff",
      click: function() {
        let lessons = eSrc.Jeff.lessons;
        teacherSelect("Jeff", lessons);
      }
    },
    Shawn: {
      text: "Shawn",
      click: function() {
        let lessons = eSrc.Shawn.lessons;
        teacherSelect("Shawn", lessons);
      }
    }
  };

  return (
    <div className="view">
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
