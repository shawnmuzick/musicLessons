import React, { useState, useEffect } from "react";
import axios from "axios";
import EmpDetails from "./EmpDetails";
import { Line } from "react-chartjs-2";
import Les_Ins from "./charts/Les_Ins";
import Les_Mon from "./charts/Les_Mon";
import {
  Teacher,
  Student,
  Event,
  monthFormat
} from "../calendarView/functions";
export default function DashboardView() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  useEffect(() => {
    axios
      .get("/api/teachers")
      .then(res => {
        const a = res.data.map(t => {
          return Teacher.create(t);
        });
        setTeachers(a);
      })
      .catch(err => console.log(err));
    axios
      .get("/api/students")
      .then(res => {
        const b = res.data.map(s => {
          return Student.create(s);
        });
        setStudents(b);
      })
      .catch(err => console.log(err));
  }, []);

  let totalLessons = 0;
  let totalStudents = students.length;
  let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < arr.length; i++) {
    arr[i] = { name: monthFormat(i), value: 0 };
  }
  teachers.forEach(t => {
    let arr2 = t.lessonsPerMonth();
    for (let i = 0; i < arr.length; i++) {
      arr[i].value += arr2[i];
    }
    t.value = arr2.reduce((x, y) => x + y);
    totalLessons += t.value;
  });
  let data = {
    labels: arr.map(m => {
      return m.name;
    }),
    datasets: [
      {
        data: arr.map(m => {
          return m.value;
        })
      }
    ]
  };
  console.log(teachers);
  return (
    <div className={"view"}>
      <h2>Dashboard</h2>
      <h3>Metrics</h3>
      <h3>Total Lessons: {totalLessons} </h3>
      <h3>Total Students: {totalStudents} </h3>
      <div className="wrapper">
        <div className="metrics">
          <div className={"chartWrap"}>{teachers && <Les_Mon arr={arr} />}</div>
          <div className={"chartWrap"}>
            {teachers && <Les_Ins teachers={teachers} />}
          </div>
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
