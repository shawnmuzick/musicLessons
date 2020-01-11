import React, { useEffect, useState } from "react";
import { FullCalendar, plugins } from "./plugins";
import { header, footer } from "./options";
import { handler, makeButtons, eventDrop, eventClick} from "./functions";
import "./calendar.css";
export default function CalendarView() {
  const calendarRef = React.createRef();
  const [params, setParams] = useState({ teacher: "", events: [], hours:[] });
  const [SRC, setSRC] = useState([]);
  useEffect(() => {
    fetch(`/api/teachers`)
      .then(res => res.json())
      .then(data => {
        setSRC(data);
      })
      .catch(err => console.log("load" + err));
  }, [setParams, params]);
  useEffect(() => {
    footer.center = "";
  });

  return (
    <div className="view">
      <h1>{params.teacher || <br />}</h1>
      <div className="wrapper">
        <FullCalendar
          customButtons={makeButtons(SRC, footer, params, setParams)}
          dateClick={args => handler(args, calendarRef, params, setParams)}
          eventClick = {e => eventClick(e, params, setParams)}
          changeView={args => handler(args, calendarRef, params, setParams)}
          eventDrop={edit => eventDrop(edit, params, setParams)}
          eventResize={edit => eventDrop(edit, params, setParams)}
          ref={calendarRef}
          footer={footer}
          header={header}
          plugins={plugins}
          events={params.events}
          businessHours={params.hours}
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
