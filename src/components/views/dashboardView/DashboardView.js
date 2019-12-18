import React, { useState, useEffect } from "react";
import EmpDetails from "./EmpDetails";

export default function DashboardView() {
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    fetch("/api/teachers")
      .then(res => res.json())
      .then(data => {setTeachers(data);})
      .catch(err => console.log(err));
  }, []);

  let totalLessons = 0;

  teachers.forEach(item => {
    item.lessons.forEach(() => {
      totalLessons++;
    })
  });

  return (
    <div id="DashboardView" className={"view"}>
      <h2>Dashboard</h2>
      <h3>Metrics</h3>
      <div className="metrics">
        <h3>Total Lessons: {totalLessons} </h3>
        <h3>Trial Conversion: </h3>
      </div>
      <h3>Faculty</h3>
      {teachers.map(teacher => (
        <EmpDetails
          key={teacher._id}
          name={teacher.name}
          phone={teacher.phone}
        />
      ))}
    </div>
  );
}
