import React, { useState } from "react";
import { editTeacherHours } from "../../calendar/functions";
import moment from 'moment';
export default function EmpForm({name, phone}) {
  const [hours, setHours] = useState({});
  const days = [0,1,2,3,4,5,6]
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
    editTeacherHours(name, phone, hours)
  }
  return (
    <form className={"EmpForm"} onSubmit={subnmitHandler} key ={name}>
      <h4>Edit Hours</h4>
      {days.map(day =>
         (
          <div className="formGroup" key ={day}>
          <label>{moment().day(day).format("ddd")}</label>
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
