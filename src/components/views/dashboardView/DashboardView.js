import React, { useState, useEffect } from "react";
import EmpDetails from "./EmpDetails";
import { PieChart, Pie, Legend, Cell, Label } from "recharts";

export default function DashboardView() {
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    fetch("/api/teachers")
      .then(res => res.json())
      .then(data => {
        setTeachers(data);
      })
      .catch(err => console.log(err));
  }, []);

  let totalLessons = 0;
  let current = 0;

  teachers.forEach(item => {
    item.lessons.forEach(() => {
      totalLessons++;
      current++;
    });
    item.value = current;
    current = 0;
  });
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <div id="DashboardView" className={"view"}>
      <h2>Dashboard</h2>
      <h3>Metrics</h3>
      <div className="metrics">
        <h3>Total Lessons: {totalLessons} </h3>
        <h3>Distribution by Instructor:</h3>
        <div className="chartWrapper">
          <PieChart width={400} height={400} data={teachers}>
            <Pie data={teachers} label={true} >
              {teachers.map((entry, index) => (
                <Cell fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>
        <h3>Distribution by Instrument:</h3>
        <div className="chartWrapper"></div>
        <h3>Trial Conversion Rate: </h3>
      </div>
      <h3>Faculty</h3>
      {teachers.map(teacher => (
        <EmpDetails
          key={teacher._id}
          name={teacher.name}
          phone={teacher.phone}
          hours={teacher.hours}
        />
      ))}
    </div>
  );
}
