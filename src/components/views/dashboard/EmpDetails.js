import React from "react";
import moment from 'moment';
import EmpForm from "./forms/EmpForm";
export default function EmpDetails({ name, phone, hours }) {
  if (hours) {
    hours.forEach(i => {
      i.daysOfWeek = i.daysOfWeek.map(i => {
        return (i = moment().day(i).format("ddd"));
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
              <div>
                {item.daysOfWeek.map(i => (
                  <p>{i + ", "}{item.startTime} {item.endTime}</p>
                ))}{" "}
              </div>
            ))}
        <EmpForm name={name} phone={phone} />
      </details>
    </div>
  );
}
