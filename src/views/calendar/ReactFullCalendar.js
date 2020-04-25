import React, { useState } from "react";
import { FullCalendar, plugins } from "./plugins";
import axios from "axios";
import { Teacher, Event } from "../../util/";
import { Button, Header, Modal } from "../../components/";
import moment from "moment";
export default function ReactFullCalendar({ calendarRef, teacher, setTeacher, makeButtons, header, footer }) {
  const [open, setOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});

  const handleModal = () => {
    setOpen(!open);
  };

  const changeView = (args) => {
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
        axios.put(`/api/lessons`, {
          event: e,
          stID,
        }),
        axios.get(`/api/teachers${teacher._id}`),
      ])
      .then(
        axios.spread((...res) => {
          const t = new Teacher(res[1].data);
          setTeacher(t);
        })
      )
      .catch((err) => console.log(err));
    return;
  };
  const postEvent = (e, stID) => {
    axios
      .all([
        axios.post(`/api/lessons`, {
          event: e,
          stID,
        }),
        axios.get(`/api/teachers${teacher._id}`),
      ])
      .then(
        axios.spread((...res) => {
          const t = new Teacher(res[1].data);
          setTeacher(t);
        })
      )
      .catch((err) => console.log(err));
    return;
  };
  const eventClick = (e) => {
    const { instrument, icon, rate } = e.extendedProps;
    e.instrument = instrument;
    e.icon = icon;
    e.rate = rate;
    moment.utc(e.start).format();
    const v = new Event(e);
    handleModal();
    setCurrentEvent(v);
  };
  const newDrop = (edit) => {
    const api = calendarRef.current.getApi();
    let e, stID;
    api.changeView("timeGridDay", edit.date);
    //if the source is an externally dragged in event
    if (edit.draggedEl) {
      edit.title = edit.draggedEl.title;
      edit.instrument = edit.draggedEl.attributes[3].value;
      edit.rate = parseFloat(edit.draggedEl.attributes[4].value);
      stID = edit.draggedEl.id;
      edit.start = edit.date;
      e = new Event(edit);
    } else {
      edit.event.instrument = edit.event.extendedProps.instrument;
      edit.event.icon = edit.event.extendedProps.icon;
      edit.event.rate = parseFloat(edit.event.extendedProps.rate);
      e = new Event(edit.event);
      stID = edit.event.extendedProps._id;
    }
    const isAvailable = teacher.checkAvailability(e);
    if (isAvailable === false) {
      window.alert(`The time you have selected is outside of ${teacher.fname}'s hours!`);
      return;
    } else {
      if (edit.draggedEl) {
        postEvent(e, stID);
      } else {
        editEvent(e, stID);
      }
    }
  };
  return (
    <>
      <FullCalendar
        customButtons={makeButtons()}
        dateClick={(args) => changeView(args)}
        eventClick={(e) => eventClick(e.event)}
        changeView={(args) => changeView(args)}
        eventDrop={(edit) => newDrop(edit)}
        drop={(edit) => newDrop(edit)}
        eventResize={(edit) => newDrop(edit)}
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
          <Header>
            <img src={`${currentEvent.icon}.jpg`} alt={`${currentEvent.title}`} />
            <h2>{currentEvent.title}</h2>
            <Button name={"x"} fn={handleModal} />
          </Header>
          {Object.keys(currentEvent).map((key) => {
            return <p>{`${key}: ${currentEvent[key]}`}</p>;
          })}
        </div>
      </Modal>
    </>
  );
}
