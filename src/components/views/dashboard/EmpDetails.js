import React from "react";
import moment from "moment";
import FrmEditHours from "../../forms/FrmEditHours";
import EmpHours from "./EmpHours";
import PopModal from "../../modal/index";
import FrmDelete from "../../forms/FrmDelete";
import axios from 'axios';
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
  const dbDelete = _id => {
    axios.delete(`/api/teachers${_id}`).catch(err => console.log(err));
  };
  return (
    <div className="formsWrap">
      <div id="employees">
        <details>
          <summary>
            <h4>{teacher.fname}</h4>
          </summary>
          <div className={"employee"}>
            <div className={"photoID"}>
              <img src={`/assets/img/faculty/${teacher._id}.jpg`} alt={`${teacher.fname}`} />
            </div>
            <div className="phone">
              <p>Phone: {teacher.phone}</p>
            </div>
            <div className="salary">
              <p>Salary: {`$${teacher.salary} per 1/2hr`}</p>
            </div>
            <EmpHours teacher={teacher} />
          </div>

          <PopModal prompt={"Enter New Hours"}>
            <FrmEditHours teacher={teacher} />
          </PopModal>
          <PopModal prompt={"Delete Instructor"}>
            <FrmDelete
              fname={teacher.fname}
              lname={teacher.lname}
              id={teacher._id}
              fn={dbDelete}
            />
          </PopModal>
        </details>
      </div>
    </div>
  );
}
