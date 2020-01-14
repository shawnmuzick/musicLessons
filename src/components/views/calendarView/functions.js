import axios from "axios";
function Teacher({_id, name, lname, lessons, hours}){
  this._id = _id;
  this.name = name;
  this.lname = lname
  this.text = name;
  this.lessons = lessons;
  this.hours = hours;
}
//note: you apparently can't use arrow syntax with this, not sure why
Teacher.prototype.getFullName = function(){
  return this.name + ' ' + this.lname;
}
function Event(title, start){
  this.title = title;
  this.start = start;
  this.end = '';
  this.id = '';
}
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
  var a = ["Sun", "Mon", "Tues", "Wed", "Thr", "Fri", "Sat"]
  return a[i]
}
const _getIndexOfDay = (d) =>{
  var a = ["Sun", "Mon", "Tues", "Wed", "Thr", "Fri", "Sat"]
  return a.indexOf(d)
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
  editEvent(id, update, params, setParams);
}
export const AddNewTeacher = setParams => {
  const { name, phone } = createTeacher();
  if(name === null || phone === null){
    return;
  }
  axios
    .post(`/api/teachers`, { name, phone })
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
const editTeacher = (name, phone, hours) =>{
  axios.put(`/api/update/teacher`, {name, phone, hours}).then(res=>console.log(res)).catch(err => console.log(err));
}
export const editTeacherHours = (name, phone, hours) =>{
  let arr = Object.keys(hours).map((key)=>{
    return {daysOfWeek:[_getIndexOfDay(key)], startTime:hours[key].startTime, endTime:hours[key].endTime}
  });

  editTeacher(name, phone, arr);
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
      const e = new Event(title, args.dateStr);
      postEvent(e, params, setParams);
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
    const test = new Teacher(item);
    obj[test.name] = test;
    test.click = function() {
      selector(test.text, test.lessons, params, setParams, test.hours);
    };
    footer.center += "," + test.text + " ";
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

