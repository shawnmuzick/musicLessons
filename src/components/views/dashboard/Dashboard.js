import React, { useState, useEffect } from "react";
import axios from "axios";
import EmpDetails from "./EmpDetails";
import Metrics from "./charts/Charts";
import DashHeader from "./DashHeader";
import moment from "moment";
import { Teacher, Student } from "../objects";
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
  //link student lessons with teachers---------------------------------------
  students.forEach(s => {
    teachers.forEach(t => {
      if (t.name === s.teacher.name) {
        s.lessons.forEach(l => {
          t.lessons.push(l);
          totalLessons++;
        });
      }
    });
  });
  let totalStudents = students.length;
  let conv = students.map(s => {
    return s.trial.trConv;
  });
  const conversionRate =
    (conv.reduce((x, y) => {
      return Number(x) + Number(y);
    }, 0) /
      conv.length) *
    100;
  let arr = [];
  for (let i = 0; i < 12; i++) {
    arr[i] = {
      name: moment()
        .month(i)
        .format("MMM"),
      value: 0
    };
  }
  teachers.forEach(t => {
    for (let i = 0; i < 12; i++) {
      arr[i].value += t.lessonsPerMonth()[i];
    }
  });

  return (
    <div className={"view"}>
      <h2>Dashboard</h2>
      <DashHeader
        totalLessons={totalLessons}
        totalStudents={totalStudents}
        conversionRate={conversionRate}
      />
      <hr />
      <h3>Graphs:</h3>
      <div className="wrapper">
        <Metrics arr={arr} teachers={teachers} students={students} />
        <div className={"forms"}>
          <h3>Faculty</h3>
          <div className="formsWrap">
            {teachers.map(teacher => (
              <EmpDetails
                key={teacher._id}
                name={teacher.name}
                phone={teacher.phone}
                hours={teacher.hours}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
