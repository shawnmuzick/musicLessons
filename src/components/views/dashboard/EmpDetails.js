import React from "react";
import moment from "moment";
import EmpForm from "../../forms/EmpForm";
import EmpHours from "./EmpHours";
export default function EmpDetails({ teacher }) {
  if (teacher.hours) {
    teacher.hours.forEach(i => {
      i.daysOfWeek = i.daysOfWeek.map(i => {
        return (i = moment()
          .day(i)
          .format("ddd"));
      });
    });
  }
  return (
    <div id="employees">
      <details>
        <summary>
          <h4>{teacher.fname}</h4>
        </summary>
        <div className={"employee"}>
          <div className={"photoID"}>
            <img src={`/img/${teacher._id}.jpg`} alt={`${teacher.fname}`} />
          </div>
          <div className="phone">
            <p>Phone: {teacher.phone}</p>
          </div>
          <EmpHours teacher={teacher} />
        </div>
        <EmpForm teacher={teacher}/>
      </details>
    </div>
  );
}
