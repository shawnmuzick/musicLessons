import React, { useState } from "react";
import { editTeacherHours } from "../calendarView/functions";

export default function EmpForm() {
  const [hours, setHours] = useState({});
  const days = ["Sun", "Mon", "Tues", "Wed", "Thr", "Fri", "Sat"]
  const changeStart = e => {
    const { name, value } = e.target;
    const update = hours;
    update[name] ? (update[name].startTime = value) : (update[name] = {startTime: value});
    setHours(update);
  };
  const changeEnd = e => {
    const { name, value } = e.target;
    const update = hours;
    update[name] ? (update[name].endTime = value) : (update[name] = {endTime: value});
    setHours(update);
  };
  const subnmitHandler = (e) =>{
    e.preventDefault();
    editTeacherHours(hours)
  }
  return (
    <form id="EmpForm" onSubmit={subnmitHandler}>
      <h4>Edit Hours</h4>
      {days.map(day =>
         (
          <div className="formGroup">
          <label>{day}</label>
          <input
            type="time"
            name={`${day}`}
            onChange={changeStart}
          />
          To:
          <input
            type="time"
            name={`${day}`}
            onChange={changeEnd}
          />
        </div>
        ))}
      <input type="submit" value="submit" />
    </form>
  );
}
