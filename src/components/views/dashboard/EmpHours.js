import React from "react";

export default function EmpHours({ hours }) {
  if (hours) {
    return (
      <div className={"postedHours"}>
        <p>Posted Hours: </p>
        {hours.map(item => (
          <div>
            {item.daysOfWeek.map(i => (
              <p>
                {i + ", "}
                {item.startTime}
                {item.endTime}
              </p>
            ))}{" "}
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
}
