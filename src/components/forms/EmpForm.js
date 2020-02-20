import React, { useState } from "react";
import { editTeacher } from "../views/calendar/functions";
import Button from "../buttons/Button";
import moment from "moment";
export default function EmpForm({ teacher }) {
  const [hours, setHours] = useState({});
  const days = [0, 1, 2, 3, 4, 5, 6];
  const changeStart = e => {
    const { name, value } = e.target;
    const update = hours;
    update[name]
      ? (update[name].startTime = value)
      : (update[name] = { startTime: value });
    setHours(update);
  };
  const changeEnd = e => {
    const { name, value } = e.target;
    const update = hours;
    update[name]
      ? (update[name].endTime = value)
      : (update[name] = { endTime: value });
    setHours(update);
  };
  const subnmitHandler = e => {
    teacher.changeAvailability(hours);
    editTeacher(teacher._id, teacher.phone, teacher.hours);
  };
  return (
    <form className={"EmpForm"} onSubmit={subnmitHandler} key={teacher._id}>
      <h4>Edit Hours</h4>
      {days.map(day => (
        <div className="formGroup" key={day}>
          <label>
            {moment()
              .day(day)
              .format("ddd")}
          </label>
          <input type="time" name={`${day}`} onChange={changeStart} />
          To:
          <input type="time" name={`${day}`} onChange={changeEnd} />
        </div>
      ))}
      <Button type="submit" name={"Submit"} fn={subnmitHandler} />
    </form>
  );
}
