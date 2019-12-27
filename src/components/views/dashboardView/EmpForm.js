import React, { useState } from "react";
import { editTeacher } from "../calendarView/functions";
const initialState = {
  Sun: "",
  Mon: "",
  Tue: "",
  Wed: "",
  Thr: "",
  Fri: "",
  Sat: ""
};
export default function EmpForm() {
  const [submission, setSubmission] = useState(initialState);
  const changeHandler = e => {
    const { name, value } = e.target;
    const update = submission;
    update[name] = value;
    setSubmission(update);
  };
  return (
    <form id="EmpForm" onSubmit={editTeacher}>
      <h4>Edit Hours</h4>
      <div className="formGroup">
        <label>Sun</label>
        <input
          type="time"
          name="Sun"
          onChange={changeHandler}
          value={submission["Sun"].value}
        />
      </div>

      <div className="formGroup">
        <label>Mon</label>
        <input
          type="time"
          name="Mon"
          onChange={changeHandler}
          value={submission["Mon"].value}
        />
      </div>

      <div className="formGroup">
        <label>Tue</label>
        <input
          type="time"
          name="Tue"
          onChange={changeHandler}
          value={submission["Tue"].value}
        />
      </div>

      <div className="formGroup">
        <label>Wed</label>
        <input
          type="time"
          name="Wed"
          onChange={changeHandler}
          value={submission["Wed"].value}
        />
      </div>

      <div className="formGroup">
        <label>Thr</label>
        <input
          type="time"
          name="Thr"
          onChange={changeHandler}
          value={submission["Thr"].value}
        />
      </div>

      <div className="formGroup">
        <label>Fri</label>
        <input
          type="time"
          name="Fri"
          onChange={changeHandler}
          value={submission["Fri"].value}
        />
      </div>

      <div className="formGroup">
        <label>Sat</label>
        <input
          type="time"
          name="Sat"
          onChange={changeHandler}
          value={submission["Sat"].value}
        />
      </div>

      <input type="submit" value="submit" />
    </form>
  );
}
