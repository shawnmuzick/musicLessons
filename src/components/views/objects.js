import moment from 'moment';
export const Teacher = {
    _id: "DEFAULT",
    name: "DEFAULT",
    lname: "DEFAULT",
    phone: "DEFAULT",
    text: "DEFAULT",
    lessons: [],
    hours: [],
    nStu: 0,
    trConv:0,
    trFail:0,
    create: function({
      _id,
      name,
      lname,
      phone,
      lessons = [],
      hours = [],
    }) {
      let teacher = Object.create(this);
      teacher._id = _id || this._id;
      teacher.name = name || window.prompt("Enter a first name: ");
      teacher.lname = lname || window.prompt("Enter a last name: ");
      teacher.phone = phone || window.prompt("Enter a phone number: ");
      teacher.text = teacher.name;
      teacher.lessons = lessons || this.lessons;
      teacher.hours = hours || this.hours;
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
      student.stID = stID || this.stID;
      student.fname = fname || window.prompt("Enter a first name: ");
      student.lname = lname || window.prompt("Enter a last name: ");
      student.phone = phone || window.prompt("Enter a phone number: ");
      student.img = img || this.img;
      student.trial = trial || this.trial;
      student.lessons = lessons || this.lessons;
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
      event.title = title || window.prompt("Name this event: ");;
      event.start = start || this.start;
      event.end = end || moment(event.start).add(30, 'minutes');
      event.id = id || this.id;
      event.backgroundColor = bkColor || this.backgroundColor;
      event.borderColor = bdColor || this.borderColor;
      return event;
    },
    changeColor: function() {
      this.backgroundColor = this.backgroundColor !== "red" ? "red" : "";
      this.borderColor = this.borderColor !== "red" ? "red" : "";
    }
};