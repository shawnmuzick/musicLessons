import React, { useState } from "react";
import { FullCalendar, plugins } from "./plugins";
import { Teacher, Event, maps, fetches } from "../../util/";
import { Button, Header, Modal } from "../../components/";
import moment from "moment";
import DeleteLesson from "../../forms/DeleteLesson";
export default function ReactFullCalendar({
    calendarRef,
    teacher,
    setTeacher,
    makeButtons,
    header,
    footer,
}) {
    const [open, setOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState({});
   // const dayStart = "10:00:00";
    //const dayEnd = "22:00:00";
    const handleModal = () => {
        setOpen(!open);
    };
    const changeView = (args) => {
        const api = calendarRef.current.getApi();
        if (api.view.type !== "timeGridDay") return api.changeView("timeGridDay", args.date);
    };
    //use to refetch teacher and rerender after posts/updates to make them immediately visible
    const getTeacher = () => {
        fetches
            .getTeacherById(teacher._id)
            .then((res) => {
                const t = new Teacher(res.data);
                setTeacher(t);
            })
            .catch((err) => console.log(err));
    };
    const calendar_event_post_edit = (e, stID) => {
        fetches.putEvent(e, stID).catch((err) => console.log(err));
        getTeacher();
    };
    const calendar_event_post_new = (e, stID) => {
        fetches.postEvent(e, stID).catch((err) => console.log(err));
        getTeacher();
    };
    const calendar_event_handle_click = (e) => {
        const { instrument, icon, rate } = e.extendedProps;
        e.instrument = instrument;
        e.icon = icon;
        e.rate = rate;
        moment.utc(e.start).format();
        const v = new Event(e);
        handleModal();
        setCurrentEvent(v);
    };
    const calendar_event_create_new = (edit) => {
        edit.title = edit.draggedEl.title;
        edit.instrument = edit.draggedEl.attributes[3].value;
        edit.rate = parseFloat(edit.draggedEl.attributes[4].value);
        edit.start = edit.date;
        return new Event(edit);
    };
    const calender_event_edit = (edit) => {
        edit.event.instrument = edit.event.extendedProps.instrument;
        edit.event.icon = edit.event.extendedProps.icon;
        edit.event.rate = parseFloat(edit.event.extendedProps.rate);
        return new Event(edit.event);
    };
    const newDrop = (edit) => {
        const api = calendarRef.current.getApi();
        let e, stID;
        api.changeView("timeGridDay", edit.date);
        //if the source is an externally dragged in event
        if (edit.draggedEl) {
            stID = edit.draggedEl.id;
            e = calendar_event_create_new(edit);
        } else {
            stID = edit.event.extendedProps._id;
            e = calender_event_edit(edit);
        }
        if (teacher.checkAvailability(e) === false)
            return window.alert(`Time is outside of ${teacher.fname}'s hours!`);
        if (edit.draggedEl) {
            calendar_event_post_new(e, stID);
        } else {
            calendar_event_post_edit(e, stID);
        }
    };
    return (
        <>
            <FullCalendar
                customButtons={makeButtons}
                dateClick={(args) => changeView(args)}
                eventClick={(e) => calendar_event_handle_click(e.event)}
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
                // minTime={dayStart}
                // maxTime={dayEnd}
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
                    {maps.iterateProps(currentEvent)}
                    <DeleteLesson fn={fetches.deleteEventById} id={currentEvent.id} />
                </div>
            </Modal>
        </>
    );
}
