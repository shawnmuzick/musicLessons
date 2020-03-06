import React, { useState } from "react";
import { FullCalendar, plugins } from "./plugins";
import axios from "axios";
import { Teacher, Event } from "../classes";
import Modal from "@material-ui/core/Modal";
import Button from "../../buttons/Button";
export default function ReactFullCalendar({
  calendarRef,
  teacher,
  setTeacher,
  makeButtons,
  header,
  footer
}) {
  const [open, setOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
    e.event.instrument = e.event.extendedProps.instrument;
    e.event.icon = e.event.extendedProps.icon;
    const v = new Event(e.event);
    handleOpen();
    setCurrentEvent(v);
  };
  const newDrop = (edit, calendarRef) => {
    const api = calendarRef.current.getApi();
    let e, stID;
    api.changeView("timeGridDay", edit.date);
    //if the source is an externally dragged in event
    if (edit.draggedEl) {
      edit.title = edit.draggedEl.title;
      edit.instrument = edit.draggedEl.attributes[3].value;
      stID = edit.draggedEl.id;
      edit.start = edit.date;
      e = new Event(edit);
    } else {
      console.log(edit.event)
      edit.event.instrument = edit.event.extendedProps.instrument;
      edit.event.icon = edit.event.extendedProps.icon;
      e = new Event(edit.event);
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
  return (
    <>
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
        timeZone={"UTC"}
        defaultTimedEventDuration={{ minutes: 30 }}
      />
      <Modal open={open} className={"modal"}>
        <div className={"modalWrapper"}>
          <div className="modalHeader">
            <img src={`${currentEvent.icon}.jpg`} alt={`${currentEvent.title}`} />
            <h2>{currentEvent.title}</h2>
            <Button name={"x"} fn={handleClose} />
          </div>
          {/* walk the student's properties */}
          {Object.keys(currentEvent).map(key => {
            // except for the 'lessons' property
            return <p>{`${key}: ${currentEvent[key]}`}</p>;
          })}
        </div>
      </Modal>
    </>
  );
}
