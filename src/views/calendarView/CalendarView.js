import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import InteractionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
export default function CalendarView() {
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

  const handleClick = args => {
    let title = window.prompt('Name this event: ')
    const newEvent = { title: title, start: args.dateStr };
    console.log(newEvent);
    setEvents([...events, newEvent]);
    console.log(events);
  };
  const header = {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
    height: "parent"
  };
  return (
    <div className={"view"}>
      <div className="wrapper">
        <FullCalendar
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
