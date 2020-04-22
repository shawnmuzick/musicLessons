import moment from "moment";

class Person {
  constructor(_id, fname, lname, phone) {
    this._id = _id || "";
    this.fname = fname || window.prompt("Enter first name: ");
    this.lname = lname || window.prompt("Enter last name: ");
    this.phone = phone || window.prompt("Enter phone number: ");
  }
  getFullName() {
    return this.name + " " + this.lname;
  }
}

export class Teacher extends Person {
  constructor({ _id, fname, lname, phone, lessons, hours, salary }) {
    super(_id, fname, lname, phone);
    this.lessons = lessons || [];
    this.hours = hours || [];
    this.text = fname;
    this.nStu = 0;
    this.trConv = 0;
    this.trFail = 0;
    this.salary = salary || 14.0;
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
    trial,
    lessons,
    instrument,
    teacher,
    tuition
  }) {
    super(_id, fname, lname, phone);
    this.trial = trial || { trDate: "", trConv: true, trConvF: "" };
    this.lessons = lessons || [];
    this.instrument = instrument;
    this.teacher = teacher || { name: "", lname: "",_id: "" };
    this.tuition = tuition || 30.0;
  }
}
export class Event {
  constructor({
    title,
    start,
    end,
    id,
    backgroundColor,
    borderColor,
    instrument,
    icon,
    rate
  }) {
    this.title = title || window.prompt("Name this event: ");
    this.start = moment.utc(start).format();
    this.end = end ? moment.utc(end).format() :
      moment.utc(start)
        .add(30, "m")
        .format();
    this.id = id;
    this.backgroundColor = backgroundColor;
    this.borderColor = borderColor;
    this.instrument = instrument;
    this.icon = icon || `/img/${instrument}`;
    this.rate = rate;
  }
}
