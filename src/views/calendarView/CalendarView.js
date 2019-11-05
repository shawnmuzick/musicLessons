import React, { useEffect, useState } from "react";
import {
  FullCalendar,
  dayGridPlugin,
  InteractionPlugin,
  timeGridPlugin
} from "./plugins";
import { header, footer } from "./options";

import "./calendar.css";
export default function CalendarView() {
  const calendarRef = React.createRef();
  const [teacher, setTeacher] = useState("Brian");
  const [events, setEvents] = useState([{}]);
  useEffect(() => {}, [events]);
  useEffect(() => {}, [teacher]);
  const handleClick = args => {
    let api = calendarRef.current.getApi();
    api.changeView("timeGridDay", args.dateStr);

    let title = window.prompt("Name this event: ");
    if (title === null) {
      return;
    }
    const newEvent = { title: title, start: args.dateStr };
    setEvents([...events, newEvent]);
  };

  const teacherSelect = (name, events) => {
    setTeacher(name);
    setEvents(events);
  };
  const customButtons = {
    Brian: {
      text: "Brian",
      click: function() {
        let lessons = [
          {
            groupId: "001",
            title: "Trumpet Lesson",
            daysOfWeek: [6],
            startRecur: "2019-11-02",
            startTime: '04:30:00',
            endTime: '05:00:00'
          }
        ];
        teacherSelect("Brian", lessons);
      }
    },
    Chrystal: {
      text: "Chrystal",
      click: function() {
        let lessons = [
          {
            groupId: "001",
            daysOfWeek: [1],
            startRecur: "2019-11-04",
            title: "Piano Lesson",
            startTime: '04:30:00',
            endTime: '05:00:00'
          }
        ];
        teacherSelect("Chrystal", lessons);
      }
    },
    Jeff: {
      text: "Jeff",
      click: function() {
        teacherSelect("Jeff", []);
      }
    },
    Shawn: {
      text: "Shawn",
      click: function() {
        teacherSelect("Shawn", []);
      }
    }
  };

  return (
    <div className="view">
      <div className="wrapper">
        <FullCalendar
          ref={calendarRef}
          timeZone={'local'}
          customButtons={customButtons}
          navLinks={true}
          footer={footer}
          header={header}
          selectable={true}
          editable={true}
          dateClick={handleClick}
          changeView={handleClick}
          plugins={[dayGridPlugin, InteractionPlugin, timeGridPlugin]}
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
