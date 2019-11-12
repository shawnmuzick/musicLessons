import React, { useEffect, useState } from "react";
import { FullCalendar, plugins } from "./plugins";
import { header, footer, eSrc } from "./options";
import { handler, selector } from "./functions";
import "./calendar.css";
export default function CalendarView() {
  const calendarRef = React.createRef();
  const [teacher, setTeacher] = useState('');
  const [events, setEvents] = useState([{}]);
  const [SRC, setSRC] = useState([]);
  useEffect(() => {
    footer.left = "";
      fetch("http://localhost:5001/api/teachers")
      .then(res => res.json())
      .then(data=>{console.log(data); setSRC(data)})
  }, [events, teacher]);
  const handleClick = args => {
    handler(args, events, setEvents, calendarRef);
  };
  const teacherSelect = (name, events) => {
    selector(name, events, setTeacher, setEvents);
  };

// const newButtons = SRC.map(item => {
//   let {name, lessons} = item
//   newButtons.name = name;
//   newButtons.text = name;
//   newButtons.click = function(){
//     teacherSelect(name,lessons)
//   }
//   // footer.left += "," + text + " ";
// })
// console.log(newButtons)
console.log(SRC)
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
