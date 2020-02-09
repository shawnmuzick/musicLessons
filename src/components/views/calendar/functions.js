import axios from "axios";
import { Teacher, Event } from "../objects";

const postEvent = (newEvent, teacher, setTeacher) => {
  axios
    .post(`/api/newLesson`, {
      teacher: teacher.name,
      newEvent: newEvent
    })
    .catch(error => console.log("load" + error));
  axios
    .get(`/api/teachers/${teacher.name}`)
    .then(res => {
      const edit = Teacher.create(res.data);
      setTeacher(edit);
    })
    .catch(error => console.log("load" + error));
};
const editEvent = (e, teacher, setTeacher, stID) => {
  axios
    .put(`/api/update/student/lesson`, {
      event: e,
      stID
    })
    .catch(err => console.log(err));
  axios
    .get(`/api/teachers/${teacher.name}`)
    .then(res => {
      res.data.lessons = [];
      const edit = Teacher.create(res.data);
      setTeacher(edit);
    })
    .catch(error => console.log("load" + error));
  return;
};
export const AddNewTeacher = setTeacher => {
  const t = Teacher.create({});
  if (t.name === null || t.phone === null) {
    return;
  }
  axios
    .post(`/api/teachers`, { name: t.name, lname: t.lname, phone: t.phone })
    .catch(err => console.log(err));
  setTeacher({});
};
export const editTeacher = (_id, phone, hours) => {
  axios
    .put(`/api/update/teacher`, { _id, phone, hours })
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
export const eventClick = (e, teacher, setTeacher) => {
  console.log(e)
  const v = Event.create(e.event);
  v.update = e.event._instance;
  v.changeColor();
  editEvent(v, teacher, setTeacher);
  e.event.remove();
};
export const newDrop = (edit, teacher, setTeacher, calendarRef) => {
  const api = calendarRef.current.getApi();
  let e, stID;
  if (api.view.type === "timeGridDay") {
    if (edit.draggedEl) {
      edit.title = edit.draggedEl.title;
      stID = edit.draggedEl.id;
      edit.start = edit.date;
      e = Event.create(edit);
    } else {
      e = Event.create(edit.event);
      stID = edit.event.extendedProps.stID;
    }
    const isAvailable = teacher.checkAvailability(e);
    if (isAvailable === false) {
      window.alert(
        `The time you have selected is outside of ${teacher.name}'s hours!`
      );
      return;
    } else {
      editEvent(e, teacher, setTeacher, stID);
      api.changeView("dayGridMonth");
    }
  } else {
    api.changeView("timeGridDay", edit.date);
  }
};
