import React, { useEffect, useState } from "react";
import { FullCalendar, plugins } from "./plugins";
import { header, footer } from "./options";
import { handler, selector } from "./functions";
import "./calendar.css";
export default function CalendarView() {
  const calendarRef = React.createRef();
  const [teacher, setTeacher] = useState("");
  const [events, setEvents] = useState([{}]);
  const [SRC, setSRC] = useState([]);
  useEffect(() => {
    fetch("/api/teachers")
    .then(res => res.json())
    .then(data=>{setSRC(data)})
    .catch(err => console.log(err))
  }, [teacher, events]);
  useEffect(() => {
    footer.left = "";
  });
  const handleClick = args => {
    handler(args, events, setEvents, calendarRef);
  };

  const arraytoobject = array =>
    array.reduce((obj, item) => {
      obj[item.name] = item;
      item.text = item.name;
      item.click = function() {
        selector(item.text, item.lessons, setTeacher, setEvents);
      };
      footer.left += "," + item.text + " ";
      return obj;
    }, {});

  const customButtons = arraytoobject(SRC);
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
