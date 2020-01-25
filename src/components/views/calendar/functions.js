import axios from "axios";
export const Teacher = {
  _id: "DEFAULT",
  name: "DEFAULT",
  lname: "DEFAULT",
  phone: "DEFAULT",
  text: "DEFAULT",
  lessons: [],
  hours: [],
  nStu:0,
  create: function({ _id, name, lname, phone, lessons = [], hours = [], nStu = 0 }) {
    let teacher = Object.create(this);
    teacher._id = _id || "";
    teacher.name = name || window.prompt("Enter a first name: ");
    teacher.lname = lname || window.prompt("Enter a last name: ");
    teacher.phone = phone || window.prompt("Enter a phone number: ");
    teacher.text = teacher.name;
    teacher.lessons = lessons;
    teacher.hours = hours;
    teacher.nStu = nStu;
    return teacher;
  },
  lessonsPerMonth: function() {
    let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.lessons.forEach(item => {
      const d = new Date(item.start);
      arr[d.getUTCMonth()]++;
    });
    return arr;
  },
  getFullName: function() {
    return this.name + " " + this.lname;
  }
};
export const Student = {
  stID: "DEFAULT",
  fname: "DEFAULT",
  lname: "DEFAULT",
  phone: "DEFAULT",
  img: "",
  trial: {
    trDate: "",
    trConv: false,
    trConvF: ""
  },
  lessons: [],
  instrument: "DEFAULT",
  teacher: {
    name: "DEFAULT",
    lname: "DEFUALT"
  },
  create: function({
    stID,
    fname,
    lname,
    phone,
    img,
    trial,
    lessons,
    instrument,
    teacher
  }) {
    let student = Object.create(this);
    student.stID = stID || "";
    student.fname = fname || window.prompt("Enter a first name: ");
    student.lname = lname || window.prompt("Enter a last name: ");
    student.phone = phone || window.prompt("Enter a phone number: ");
    student.img = img;
    student.trial = trial;
    student.lessons = lessons;
    student.instrument = instrument || window.prompt("Enter an instrument: ");
    student.teacher = teacher || window.prompt("Enter a teacher: ");
    return student;
  },
  getFullName: function() {
    return this.fname + " " + this.lname;
  }
};
export const Event = {
  title: "DEFAULT",
  start: "",
  end: "",
  id: "",
  backgroundColor: "",
  borderColor: "",
  create: function Event(title, start, end, id, bkColor, bdColor) {
    let event = Object.create(this);
    event.title = title;
    event.start = start;
    event.end = end;
    event.id = id;
    event.backgroundColor = bkColor;
    event.borderColor = bdColor;
    return event;
  },
  changeColor: function() {
    this.backgroundColor = this.backgroundColor !== "red" ? "red" : "";
    this.borderColor = this.borderColor !== "red" ? "red" : "";
  }
};
const addZero = i => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};
const timeFormat = eventObject => {
  return (
    addZero(eventObject.getUTCHours()) +
    ":" +
    addZero(eventObject.getUTCMinutes())
  );
};
export const dayFormat = i => {
  var a = ["Sun", "Mon", "Tues", "Wed", "Thr", "Fri", "Sat"];
  return a[i];
};
export const monthFormat = i => {
  var a = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  return a[i];
};
const _getIndexOfDay = d => {
  var a = ["Sun", "Mon", "Tues", "Wed", "Thr", "Fri", "Sat"];
  return a.indexOf(d);
};
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
  const eventDate = new Date(
    eventObject.dateStr || eventObject.event._instance.range.start
  );
  const day = eventDate.getDay();
  const time = timeFormat(eventDate);
  const businessHours = eventObject.view.context.options.businessHours;
  console.log("extracted: " + time);
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
const editEvent = (event, teacher, setTeacher) => {
  axios
    .put(`/api/update/lesson`, {
      id: event.id,
      event: event,
      name: teacher.name
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
  const { title, start, end, id, backgroundColor, borderColor } = e.event;
  const v = Event.create(title, start, end, id, backgroundColor, borderColor);
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
      daysOfWeek: [_getIndexOfDay(key)],
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
      let title = nameEvent();
      if (title === null) {
        return;
      }
      const e = Event.create(title, args.dateStr);
      postEvent(e, teacher, setTeacher);
      api.changeView("dayGridMonth");
    }
  } else {
    api.changeView("timeGridDay", args.dateStr);
  }
};
export const selector = (next, current, setTeacher) => {
  if (next.name === current.name) {
    return;
  }
  setTeacher(next);
};
export const eventDrop = (edit, teacher, setTeacher) => {
  const { day, time, businessHours } = extractEventDetails(edit);

  const isAvailable = checkAvailability(businessHours, day, time);
  if (isAvailable === false) {
    window.alert(
      "The time you have selected is outside of this instructor's hours!"
    );
    return;
  } else {
    editEvent(edit.event.id, edit.event._instance, teacher, setTeacher);
  }
};
export const makeButtons = (SRC, footer, teacher, setTeacher) => {
  let obj = SRC.reduce((obj, item) => {
    const test = Teacher.create(item);
    obj[test.name] = test;
    test.click = function() {
      selector(test, teacher, setTeacher);
    };
    footer.center += "," + test.text + " ";
    return obj;
  }, {});
  obj.New = {};
  obj.New.text = "Add New";
  obj.New.click = function() {
    AddNewTeacher(setTeacher);
  };
  footer.center += "," + obj.New.text;
  return obj;
};
