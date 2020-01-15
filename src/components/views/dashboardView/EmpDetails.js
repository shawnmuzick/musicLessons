import React from "react";
import { dayFormat } from "../calendarView/functions";
import EmpForm from "./EmpForm";
export default function EmpDetails({ name, phone, hours }) {
  if (hours) {
    hours.forEach(i => {
      i.daysOfWeek = i.daysOfWeek.map(i => {
        return (i = dayFormat(i));
      });
    });
  }
  return (
    <div id="employees">
      <details>
        <summary>
          <h4>{name}</h4>
        </summary>
        <p>Phone: {phone}</p>
        <p>Current Hours: </p>
        {hours === undefined
          ? ""
          : hours.map(item => (
              <div key={item.daysOfWeek}>
                {item.daysOfWeek.map(i => (
                  <p key ={i}>{i + ", "}{item.startTime} {item.endTime}</p>
                ))}{" "}
              </div>
            ))}
        <EmpForm name={name} phone={phone} />
      </details>
    </div>
  );
}
