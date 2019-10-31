import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

export default function CalendarView() {
  return (
    <div className={"view"}>
      <div>
        <FullCalendar plugins={[dayGridPlugin]} />
      </div>
    </div>
  );
}
