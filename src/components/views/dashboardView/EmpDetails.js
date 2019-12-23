import React from "react";
import {dayFormat} from '../calendarView/functions'
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
        <summary>{name}</summary>
        <p>Phone: {phone}</p>
        <p>
          Hours:{" "}
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
      </details>
    </div>
  );
}
