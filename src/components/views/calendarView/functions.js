import axios from "axios";
const addZero = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
const timeFormat = (eventObject) =>{
  return eventObject.getUTCHours() + ":" + addZero(eventObject.getUTCMinutes());
}
const checkAvailability = (compare, day, time) =>{
  let isAvailable = false;
  compare.forEach(item => {
    item.daysOfWeek.forEach(d => {
      if (d === day) {
        if (time >= item.startTime && time < item.endTime) {
          isAvailable =  true;
        } else {
          window.alert(
            "The time you have selected is outside of this instructor's hours!"
          );
          isAvailable = false;
        }
      }
    });
  });
  return isAvailable;
}
const nameEvent = () =>{
  return window.prompt("Name this event: ");
}
const postEvent = (newEvent, params, setParams) =>{
  axios
  .post(`/api/newLesson/${params.teacher}`, {
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
}
const createTeacher = () =>{
  let name = window.prompt("Enter a name: ");
  if (name === null) {
    return;
  }
  let phone = window.prompt("Enter a phone number: ");
  if (phone === null) {
    return;
  }
  return {name, phone};
}
export const handler = (args, calendarRef, params, setParams) => {
    //ENABLE THIS TO NAVIGATE ON DAY CLICK
  const api = calendarRef.current.getApi();
  const compare = args.view.context.options.businessHours;
  const eventDate = new Date(args.dateStr);
  const day = eventDate.getDay();
  const time = timeFormat(eventDate);

  if (api.view.type === "timeGridDay") {
    const isAvailable = checkAvailability(compare,day,time);
    if (isAvailable === false) {
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
export const drop = (edit, params, setParams) => {
  axios
    .put(`/api/update/`, {
      id: edit.event.id,
      update: edit.event._instance,
      name: params.teacher
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));

  setParams({ teacher: params.teacher, events: params.events, hours:params.hours });
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

export const AddNewTeacher = setParams => {
  const {name, phone} = createTeacher();
  axios
    .post(`/api/teachers`, { name, phone })
    .then(response => {
      console.log(response);
    })
    .catch(err => console.log(err));
  setParams({ teacher: "", events: [], hours:[] });
};
