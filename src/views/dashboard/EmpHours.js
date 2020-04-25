import React from "react";
import moment from "moment";
export default function EmpHours({ teacher }) {
  if (teacher.hours) {
    teacher.hours.forEach((i) => {
      i.daysOfWeek = i.daysOfWeek.map((i) => {
        return (i = moment().day(i).format("ddd"));
      });
    });
  }
  const renderHours = () => {
    return teacher.hours.map((item) => (
      <div key={`${teacher._id} ${item.daysOfWeek}`}>
        {item.daysOfWeek.map((i) => (
          <p key={`${teacher._id} ${i}`}>{`${i} - ${item.startTime} - ${item.endTime}`}</p>
        ))}
      </div>
    ));
  };
  if (teacher.hours) {
    return (
      <div className={"postedHours"}>
        <p>Posted Hours: </p>
        {renderHours()}
      </div>
    );
  } else {
    return null;
  }
}
