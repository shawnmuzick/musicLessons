import React, { useEffect, useState } from "react";
import { FullCalendar, plugins, Draggable } from "./plugins";
import {eventClick, newDrop } from "./functions";
import { Teacher, Student } from "../objects";
import StuCont from "./stuCont";
import "./calendar.css";
import axios from "axios";
export default function Calendar() {
  const calendarRef = React.createRef();
  const [teacher, setTeacher] = useState({});
  const [students, setStudents] = useState([]);
  const [SRC, setSRC] = useState([]);
  const header = {
    left: "prev,next, today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay"
  };
  const footer = {
    center: ""
  };
  //On First Render----------------------------------------------------------------
  useEffect(() => {
    axios
      .get("/api/teachers")
      .then(res => {
        const a = res.data.map(t => {
          t.lessons = [];
          return Teacher.create(t);
        });
        setSRC(a);
      })
      .catch(err => console.log(err));
    let draggableEl = document.getElementById("extEvents");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function(eventEl) {
        let title = eventEl.getAttribute("title");
        let stID = eventEl.getAttribute("id");
        return {
          allDay: false,
          title: title,
          stID: stID,
          // you need this parameter to avoid duplicates!!!
          create: false
        };
      }
    });
  }, []);
  //whenever the current teacher changes, rerender, fetch students, and link them up
  useEffect(() => {
    teacher.lessons = [];
    axios
      .get("/api/students")
      .then(res => {
        const b = res.data.map(s => {
          return Student.create(s);
        });
        setStudents(b);
      })
      .catch(err => console.log(err));
  }, [teacher]);

  const makeButtons = () => {
        //This links students and their teachers, disable to restore previous functionality
        students.forEach(s => {
          if ((teacher.name === s.teacher.name) && (teacher.lname === s.teacher.lname)) {
            s.lessons.forEach(l => {
              l.stID = s.stID || "";
              teacher.lessons.push(l);
            });
          }
        });
    let obj = SRC.reduce((obj, item) => {
      obj[item.lname] = item;
      item.click = function() {
        item.lessons=[];
        setTeacher(item);
      };
      footer.center += item.lname + ",";
      return obj;
    }, {});
    return obj;
  };
  const changeView = (args, calendarRef) => {
    const api = calendarRef.current.getApi();
    if (api.view.type === "timeGridDay") {
      return;
    } else {
      api.changeView("timeGridDay", args.date);
    }
  };
  return (
    <div className="view">
      <h1>{teacher.name || <br />}</h1>
      <hr />
      <div className="wrapper" id="CalendarWrap">
        <StuCont students={students} teacher={teacher} setStudents={setStudents}/>
        <div className="spacer"></div>
        <FullCalendar
          customButtons={makeButtons()}
          dateClick={args => changeView(args, calendarRef)}
          eventClick={e => eventClick(e, teacher, setTeacher)}
          changeView={args => changeView(args, calendarRef)}
          eventDrop={edit => newDrop(edit, teacher, setTeacher,calendarRef)}
          drop={edit => newDrop(edit, teacher, setTeacher, calendarRef)}
          eventResize={edit => newDrop(edit, teacher, setTeacher,calendarRef)}
          ref={calendarRef}
          footer={footer}
          header={header}
          plugins={plugins}
          events={teacher.lessons}
          droppable={true}
          businessHours={teacher.hours}
          eventLimit={3}
          navLinks={true}
          eventDurationEditable={true}
          eventStartEditable={true}
          eventOverlap={false}
          selectable={true}
          editable={true}
          allDayDefault={false}
          minTime={'10:00:00'}
          maxTime={'22:00:00'}
          height={"parent"}
          timeZone={"UTC"}
          defaultTimedEventDuration={{ minutes: 30 }}
        />
      </div>
    </div>
  );
}
