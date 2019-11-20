import React, { useEffect, useState } from "react";
import { FullCalendar, plugins } from "./plugins";
import { header, footer } from "./options";
import { handler, makeButtons, drop } from "./functions";
import "./calendar.css";
export default function CalendarView() {
  const calendarRef = React.createRef();
  const [params, setParams] = useState({ teacher: "", events: [] });
  const [SRC, setSRC] = useState([]);
  useEffect(() => {
    fetch(`/api/teachers`)
      .then(res => res.json())
      .then(data => {
        setSRC(data);
        console.log("retrieved");
      })
      .catch(err => console.log("load" + err));
  }, [setParams, params]);
  useEffect(() => {
    footer.left = "";
  });

  return (
    <div className="view">
      <h1>{params.teacher || <br />}</h1>
      <div className="wrapper">
        <FullCalendar
          ref={calendarRef}
          customButtons={makeButtons(SRC, footer, params, setParams)}
          navLinks={true}
          footer={footer}
          header={header}
          selectable={true}
          editable={true}
          dateClick={args => handler(args, calendarRef, params, setParams)}
          changeView={args => handler(args, calendarRef, params, setParams)}
          plugins={plugins}
          events={params.events}
          eventDrop={edit => drop(edit, params, setParams)}
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
