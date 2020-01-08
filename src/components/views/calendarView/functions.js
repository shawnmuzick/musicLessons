import axios from "axios";
const addZero = i => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};
const timeFormat = eventObject => {
  return eventObject.getUTCHours() + ":" + addZero(eventObject.getUTCMinutes());
};
export const dayFormat = (i) =>{
  switch (i) {
    case 0:
      i = "Sun";
      break;
    case 1:
      i = "Mon";
      break;
    case 2:
      i = "Tue";
      break;
    case 3:
      i = "Wed";
      break;
    case 4:
      i = "Thr";
      break;
    case 5:
      i = "Fri";
      break;
    case 6:
      i = "Sat";
      break;
      default:
        i = "Sun";
        break;
  }
  return i;
}
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
const nameEvent = () => {
  return window.prompt("Name this event: ");
};
const extractEventDetails = eventObject => {
  const eventDate = new Date(eventObject.dateStr || eventObject.event._instance.range.start);
  const day = eventDate.getDay();
  const time = timeFormat(eventDate);
  const businessHours = eventObject.view.context.options.businessHours;
  return { day, time, businessHours };
};
const postEvent = (newEvent, params, setParams) => {
  axios
    .post(`/api/newLesson`, {
      teacher: params.teacher,
      newEvent: newEvent
    })
    .catch(error => console.log("load" + error));
  axios
    .get(`/api/teachers/${params.teacher}`)
    .then(res => {
      setParams({
        teacher: res.data.name,
        events: res.data.lessons,
        hours: res.data.hours || []
      });
    })
    .catch(error => console.log("load" + error));
};
const editEvent = (id, update, params, setParams) => {
  axios
    .put(`/api/update/lesson`, {
      id: id,
      update: update,
      name: params.teacher
    })
    .catch(err => console.log(err));
    axios
    .get(`/api/teachers/${params.teacher}`)
    .then(res => {
      setParams({
        teacher: res.data.name,
        events: res.data.lessons,
        hours: res.data.hours || []
      });
    })
    .catch(error => console.log("load" + error));
};
const editEventColor = (e) => {
  return e !== 'red' ? 'red' : '';
}
export const eventClick = (e, params, setParams) =>{
  const id = e.event.id;
  const update = e.event._instance;
  let style = e.el.style;
  let color = style.backgroundColor;
  style.backgroundColor = style.borderColor = update.backgroundColor = update.borderColor = editEventColor(color);

editEvent(id, update, params, setParams)
}
export const AddNewTeacher = setParams => {
  const { name, phone } = createTeacher();
  if(name === null || phone === null){
    return;
  }
  axios
    .post(`/api/teachers`, { name, phone })
    .then(response => {
      console.log(response);
    })
    .catch(err => console.log(err));
  setParams({ teacher: "", events: [], hours: [] });
};
const createTeacher = () => {
  let name = window.prompt("Enter a name: ");
  if (name === null) {
    return {name};
  }
  let phone = window.prompt("Enter a phone number: ");
  if (phone === null) {
    return {name, phone};
  }
  return { name, phone };
};
export const editTeacherHours = (e) =>{
  console.log(e)

}
export const handler = (args, calendarRef, params, setParams) => {
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
      let title = nameEvent();
      if (title === null) {
        return;
      }
      const newEvent = { title: title, start: args.dateStr };
      postEvent(newEvent, params, setParams);
      api.changeView("dayGridMonth");
    }
  } else {
    api.changeView("timeGridDay", args.dateStr);
  }
};
export const selector = (name, events, params, setParams, hours) => {
  if (name === params.teacher) {
    return;
  }
  setParams({ teacher: name, events: events, hours: hours });
};
export const eventDrop = (edit, params, setParams) => {
  const { day, time, businessHours } = extractEventDetails(edit);

  const isAvailable = checkAvailability(businessHours, day, time);
  if (isAvailable === false) {
    window.alert(
      "The time you have selected is outside of this instructor's hours!"
    );
    return;
  } else {
    editEvent(edit.event.id, edit.event._instance, params, setParams);
  }
};
export const makeButtons = (SRC, footer, params, setParams) => {
  let obj = SRC.reduce((obj, item) => {
    obj[item.name] = item;
    item.text = item.name;
    item.click = function() {
      selector(item.text, item.lessons, params, setParams, item.hours);
    };
    footer.center += "," + item.text + " ";
    return obj;
  }, {});
  obj.New = {};
  obj.New.text = "Add New";
  obj.New.click = function() {
    AddNewTeacher(setParams);
  };
  footer.center += "," + obj.New.text;
  return obj;
};

