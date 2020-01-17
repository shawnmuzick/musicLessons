import React, { useState, useEffect } from "react";
import EmpDetails from "./EmpDetails";
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Cell
} from "recharts";
import { Teacher, monthFormat } from "../calendarView/functions";
export default function DashboardView() {
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    fetch("/api/teachers")
      .then(res => res.json())
      .then(data => {
        const f = data.map(t => {
          return Teacher.create(t);
        });
        setTeachers(f);
      })
      .catch(err => console.log(err));
  }, []);

  let totalLessons = 0;
  let current = 0;
  let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < arr.length; i++) {
    arr[i] = { name: monthFormat(i), value: 0 };
  }
  teachers.forEach(t => {
    let arr2 = t.lessonsPerMonth();
    for (let i = 0; i < arr.length; i++) {
      arr[i].value += arr2[i];
    }
    t.lessons.forEach(() => {
      totalLessons++;
      current++;
    });
    t.value = current;
    current = 0;
  });
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "red",
    "purple",
    "darkblue",
    "green",
    "pink"
  ];
  return (
    <div id="DashboardView" className={"view"}>
      <h2>Dashboard</h2>
      <h3>Metrics</h3>
      <h3>Total Lessons: {totalLessons} </h3>
      <div className="metrics">
        <div className="chartWrapper">
          <h3>Distribution by Instructor:</h3>
          <PieChart width={400} height={400} data={teachers}>
            <Pie data={teachers} label={true}>
              {teachers.map((entry, index) => (
                <Cell fill={COLORS[index % COLORS.length]} key={entry} />
              ))}
            </Pie>
            <Legend
              layout={"vertical"}
              align={"right"}
              verticalAlign={"middle"}
            />
          </PieChart>
        </div>

        <div className="chartWrapper">
          <h3>Lessons per Month:</h3>
          <LineChart width={600} height={400} data={arr}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </div>
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
