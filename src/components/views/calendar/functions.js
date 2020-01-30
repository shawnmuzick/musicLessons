import axios from "axios";
import moment from "moment";
import {Teacher, Event} from '../objects';

const checkAvailability = (businessHours, day, time) => {
  let isAvailable = false;
  businessHours.forEach(item => {
    item.daysOfWeek.forEach(d => {
      if (d === day) {
        if (time >= item.startTime && time < item.endTime) {
          isAvailable = true;
        } else {
          isAvailable = false;
        }
      }
    });
  });
  return isAvailable;
};
const extractEventDetails = eventObject => {
  const eventDate = moment.utc(
    eventObject.date || eventObject.event._instance.range.start
  );
  const day = eventDate.day();
  const time = eventDate.format("HH:mm");
  const businessHours = eventObject.view.context.options.businessHours;
  return { day, time, businessHours };
};
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
      const edit = Teacher.create(res.data);
      setTeacher(edit);
    })
    .catch(error => console.log("load" + error));
};
export const eventClick = (e, teacher, setTeacher) => {
  const v = Event.create(e.event);
  v.update = e.event._instance;
  v.changeColor();
  editEvent(v, teacher, setTeacher);
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
const editTeacher = (name, phone, hours) => {
  axios
    .put(`/api/update/teacher`, { name, phone, hours })
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
export const editTeacherHours = (name, phone, hours) => {
  let arr = Object.keys(hours).map(key => {
    return {
      daysOfWeek: [key],
      startTime: hours[key].startTime,
      endTime: hours[key].endTime
    };
  });

  editTeacher(name, phone, arr);
};
export const handler = (args, calendarRef, teacher, setTeacher) => {
  //ENABLE THIS TO NAVIGATE ON DAY CLICK
  const api = calendarRef.current.getApi();
  const { day, time, businessHours } = extractEventDetails(args);
  if (api.view.type === "timeGridDay") {
    const isAvailable = checkAvailability(businessHours, day, time);
    if (isAvailable === false) {
      window.alert(
        "The time you have selected is outside of this instructor's hours!"
      );
      return;
    } else {
      const e = Event.create(null, args.dateStr);
      if (e.title === null) {
        return;
      }
      postEvent(e, teacher, setTeacher);
      api.changeView("dayGridMonth");
    }
  } else {
    api.changeView("timeGridDay", args.dateStr);
  }
};
export const eventDrop = (edit, teacher, setTeacher) => {
  const { day, time, businessHours } = extractEventDetails(edit);
  const stID = edit.event.extendedProps.stID;
  const isAvailable = checkAvailability(businessHours, day, time);
  if (isAvailable === false) {
    window.alert(
      "The time you have selected is outside of this instructor's hours!"
    );
    return;
  } else {
    const e = Event.create(edit.event)
    editEvent(e, teacher, setTeacher,stID);
  }
};
export const externalDrop = (edit, teacher, calendarRef) => {
  const api = calendarRef.current.getApi();
  api.changeView("timeGridDay", edit.date);
  edit.title = edit.draggedEl.title;
  edit.stID = edit.draggedEl.id
  edit.allDay = false;
}