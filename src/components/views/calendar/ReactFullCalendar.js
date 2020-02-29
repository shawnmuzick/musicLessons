import React from "react";
import { FullCalendar, plugins } from "./plugins";
import axios from "axios";
import { Teacher, Event } from "../classes";

export default function ReactFullCalendar({
  calendarRef,
  teacher,
  setTeacher,
  makeButtons,
  header,
  footer
}) {
  const changeView = (args, calendarRef) => {
    const api = calendarRef.current.getApi();
    if (api.view.type === "timeGridDay") {
      return;
    } else {
      api.changeView("timeGridDay", args.date);
    }
  };
  const editEvent = (e, stID) => {
    axios
      .all([
        axios.put(`/api/update/student/lesson`, {
          event: e,
          stID
        }),
        axios.get(`/api/teachers/${teacher.fname}`)
      ])
      .then(
        axios.spread((...res) => {
          const t = new Teacher(res[1].data);
          setTeacher(t);
        })
      )
      .catch(err => console.log(err));
    return;
  };
  const eventClick = e => {
    const v = Event.create(e.event);
    v.update = e.event._instance;
    v.changeColor();
    editEvent(v);
    e.event.remove();
  };
  const newDrop = (edit, calendarRef) => {
    const api = calendarRef.current.getApi();
    let e, stID;
    api.changeView("timeGridDay", edit.date);
    //if the source is an externally dragged in event
    if (edit.draggedEl) {
      edit.title = edit.draggedEl.title;
      stID = edit.draggedEl.id;
      edit.start = edit.date;
      e = Event.create(edit);
    } else {
      e = Event.create(edit.event);
      stID = edit.event.extendedProps._id;
    }
    const isAvailable = teacher.checkAvailability(e);
    if (isAvailable === false) {
      window.alert(
        `The time you have selected is outside of ${teacher.fname}'s hours!`
      );
      return;
    } else {
      editEvent(e, stID);
    }
  };

  const appendX = (info) =>{
    let node = document.createElement("button");
    node.innerText = "x";
    info.el.firstElementChild.appendChild(node);
  }
  return (
    <FullCalendar
      customButtons={makeButtons()}
      dateClick={args => changeView(args, calendarRef)}
      eventClick={e => eventClick(e)}
      changeView={args => changeView(args, calendarRef)}
      eventDrop={edit => newDrop(edit, calendarRef)}
      drop={edit => newDrop(edit, calendarRef)}
      eventResize={edit => newDrop(edit, calendarRef)}
      ref={calendarRef}
      footer={footer}
      header={header}
      plugins={plugins}
      events={teacher.lessons}
      eventPositioned={info=> appendX(info)}
      droppable={true}
      businessHours={teacher.hours}
      eventLimit={3}
      eventDurationEditable={true}
      eventStartEditable={true}
      eventOverlap={false}
      editable={true}
      allDayDefault={false}
      minTime={"10:00:00"}
      maxTime={"22:00:00"}
      height={"parent"}
      timeZone={"UTC"}
      defaultTimedEventDuration={{ minutes: 30 }}
    />
  );
}
