import React from "react";
import moment from "moment";
import FrmEditHours from "../../forms/FrmEditHours";
import EmpHours from "./EmpHours";
import PopModal from "../../modal/index";
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
    <div className="formsWrap">
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

          <PopModal prompt={"Enter New Hours"}>
            <FrmEditHours teacher={teacher} />
          </PopModal>
        </details>
      </div>
    </div>
  );
}
