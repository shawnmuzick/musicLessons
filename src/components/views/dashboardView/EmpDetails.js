import React from "react";
import {dayFormat} from '../calendarView/functions'
import EmpForm from './EmpForm';
export default function EmpDetails({ name, phone, hours }) {
  if (hours) {
    hours.forEach(i => {
      i.daysOfWeek = i.daysOfWeek.map(i => {
        return i = dayFormat(i)
      });
    });
    console.log(hours);
  }
  return (
    <div id="employees">
      <details>
        <summary><h4>{name}</h4></summary>
        <p>Phone: {phone}</p>
        <p>
          Current Hours:{" "}
          {hours === undefined
            ? ""
            : hours.map(item => (
                <li>
                  {item.daysOfWeek.map(i => (
                    <>{i + ", "}</>
                  ))}{" "}
                  {item.startTime} {item.endTime}
                </li>
              ))}
        </p>
        <EmpForm />
      </details>
    </div>
  );
}
