import React from "react";
import EmpDetails from "./EmpDetails"
export default function FacultyView() {
  let faculty = [
    {
      id: 1,
      name: "Brian",
      phone: '555-555-5555'
    },
    {
      id: 2,
      name: "Chrystal",
      phone: '555-555-5555'

    },
    {
      id: 3,
      name: "Donny",
      phone: '555-555-5555'

    },
    {
      id: 4,
      name: "Shawn",
      phone: '555-555-5555'

    }
  ];

  return (
    <div id="FacultyView" className={"view"}>
      <h2>Faculty</h2>
      {faculty.map(teacher => (
        <EmpDetails key = {teacher.id} teacher = {teacher}/>
      ))}
    </div>
  );
}
