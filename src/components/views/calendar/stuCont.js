import React from "react";
export default function StuCont({ students,teacher }) {
  return (
    <div className={"extEvents"} id="extEvents">
      <h2>Students</h2>
      {students.filter(s=>s.teacher.name === teacher.name).map(s => (
        <div
          className="fc-event"
          title={s.fname + " " + s.lname + "'s " + s.instrument + " lesson"}
          key={s.stId}
          id={s.stID}
        >
          {s.fname + " " + s.lname}
        </div>
      ))}
    </div>
  );
}
