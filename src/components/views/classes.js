import moment from "moment";

class Person {
  constructor(_id, fname, lname, phone, img) {
    this._id = _id || "";
    this.fname = fname || window.prompt("Enter first name: ");
    this.lname = lname || window.prompt("Enter last name: ");
    this.phone = phone || window.prompt("Enter phone number: ");
    this.img = img;
  }
  getFullName() {
    return this.name + " " + this.lname;
  }
}

export class Teacher extends Person {
  constructor({ _id, fname, lname, phone, lessons, hours, img }) {
    super(_id, fname, lname, phone, img);
    this.lessons = lessons || [];
    this.hours = hours || [];
    this.text = fname;
    this.nStu = 0;
    this.trConv = 0;
    this.trFail = 0;
  }
  lessonsPerMonth() {
    let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.lessons.forEach(item => {
      const d = new Date(item.start);
      arr[d.getUTCMonth()]++;
    });
    return arr;
  }
  getConvRate() {
    return (this.trConv / (this.trConv + this.trFail)) * 100;
  }
  changeAvailability(hours) {
    let newHours = Object.keys(hours).map(key => {
      return {
        daysOfWeek: [key],
        startTime: hours[key].startTime,
        endTime: hours[key].endTime
      };
    });
    this.hours = newHours;
    //makes this chainable!
    return this;
  }
  checkAvailability(eventObject) {
    const time = moment.utc(eventObject.start).format("HH:mm");
    const day = moment.utc(eventObject.start).day();
    let isAvailable = false;
    this.hours.forEach(h => {
      h.daysOfWeek.forEach(d => {
        d = Number(d);
        if (d === day) {
          if (time >= h.startTime && time < h.endTime) {
            isAvailable = true;
          } else {
            isAvailable = false;
          }
        }
      });
    });
    return isAvailable;
  }
}
export class Student extends Person {
  constructor({
    _id,
    fname,
    lname,
    phone,
    img,
    trial,
    lessons,
    instrument,
    teacher
  }) {
    super(_id, fname, lname, phone, img);
    this.trial = trial || { trDate: "", trConv: true, trConvF: "" };
    this.lessons = lessons || [];
    this.instrument = instrument;
    this.teacher = teacher || { name: "", lname: "" };
  }
}
export const Event = {
  title: "DEFAULT",
  start: "",
  end: "",
  id: "",
  backgroundColor: "",
  borderColor: "",
  create: function Event(eventObject) {
    const { title, start, end, id, backgroundColor, borderColor } = eventObject;
    let event = Object.create(this);
    event.title = title || window.prompt("Name this event: ");
    event.start = moment.utc(start).format() || this.start;
    event.end =
      end ||
      moment
        .utc(start)
        .add(30, "minutes")
        .format();
    event.id = id || this.id;
    event.backgroundColor = backgroundColor || this.backgroundColor;
    event.borderColor = borderColor || this.borderColor;
    return event;
  },
  changeColor: function() {
    this.backgroundColor = this.backgroundColor !== "red" ? "red" : "";
    this.borderColor = this.borderColor !== "red" ? "red" : "";
    //make this chainable
    return this;
  }
};
