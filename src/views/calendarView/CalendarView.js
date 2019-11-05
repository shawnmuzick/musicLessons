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
  const [teacher, setTeacher] = useState("Brian");
  const [events, setEvents] = useState([
    {
      groupId: "001",
      daysOfWeek: [6],
      startRecur: "2019-11-02",
      title: "Piano Lesson",
      start: "2019-11-02 10:30:00",
      end: "2019-11-03 11:30:00"
    }
  ]);
  useEffect(() => {}, [events]);
  useEffect(() => {}, [teacher]);

  const handleClick = args => {
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
            daysOfWeek: [6],
            startRecur: "2019-11-02",
            title: "Trumpet Lesson",
            start: "2019-11-02 10:30:00",
            end: "2019-11-02 11:30:00"
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
            start: "2019-11-04 10:30:00",
            end: "2019-11-04 11:30:00"
          }
        ];
        teacherSelect("Chrystal", lessons);
      }
    },
    Jeff: {
      text: "Jeff",
      click: function() {
        teacherSelect("Jeff");
      }
    },
    Shawn: {
      text: "Shawn",
      click: function() {
        teacherSelect("Shawn");
      }
    }
  };

  return (
    <div className="view">
      <div className="wrapper">
        <FullCalendar
          customButtons={customButtons}
          footer={footer}
          header={header}
          selectable={true}
          editable={true}
          dateClick={handleClick}
          plugins={[dayGridPlugin, InteractionPlugin, timeGridPlugin]}
          events={events}
          eventLimit={3}
          eventDurationEditable={true}
          eventStartEditable={true}
          height={"parent"}
        />
      </div>
    </div>
  );
}
