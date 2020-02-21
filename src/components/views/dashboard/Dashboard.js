import React, { useState, useEffect } from "react";
import axios from "axios";
import EmpDetails from "./EmpDetails";
import FrmNewTeacher from "../../forms/FrmNewTeacher";
import DashHeader from "./DashHeader";
import moment from "moment";
import { Teacher, Student } from "../classes";
import PopModal from "../../modal/index";
import { LesIns, LesMon, StuIns, TConvIns, Charts } from "./charts/index";
export default function DashboardView() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  useEffect(() => {
    axios
      .all([axios.get("/api/teachers"), axios.get("/api/students")])
      .then(
        axios.spread((...res) => {
          const a = res[0].data.map(t => {
            return new Teacher(t);
          });
          setTeachers(a);
          const b = res[1].data.map(s => {
            return new Student(s);
          });
          setStudents(b);
        })
      )
      .catch(err => console.log(err));
  }, []);
  let totalLessons = 0;
  let arr = [];
  for (let i = 0; i < 12; i++) {
    arr[i] = {
      name: moment()
        .month(i)
        .format("MMM"),
      value: 0
    };
  }

  //link student lessons with teachers---------------------------------------
  students.forEach(s => {
    teachers.forEach(t => {
      if (t.fname === s.teacher.name) {
        s.lessons.forEach(l => {
          t.lessons.push(l);
          totalLessons++;
        });
      }
      for (let i = 0; i < 12; i++) {
        arr[i].value += t.lessonsPerMonth()[i];
      }
    });
  });

  let conv = students.map(s => {
    return s.trial.trConv;
  });
  let conversionRate = Math.round(
    (conv.reduce((x, y) => {
      return Number(x) + Number(y);
    }, 0) /
      conv.length) *
      100
  );
  const handleClick = a => {
    const t = new Teacher(a);
    if (t.name === null || t.phone === null) {
      return;
    }
    axios
      .all([
        axios.post(`/api/teachers`, {
          fname: t.fname,
          lname: t.lname,
          phone: t.phone
        }),
        axios.get("/api/teachers")
      ])
      .then(
        axios.spread((...res) => {
          const a = res[1].data.map(t => {
            return new Teacher(t);
          });
          setTeachers(a);
        })
      )
      .catch(err => console.log(err));
  };
  return (
    <div className={"view"}>
      <DashHeader
        totalLessons={totalLessons}
        totalStudents={students.length}
        conversionRate={conversionRate}
      />
      <div className="wrapper">
        <Charts>
          <LesIns arr={arr} teachers={teachers} students={students} />
          <LesMon arr={arr} teachers={teachers} students={students} />
          <StuIns arr={arr} teachers={teachers} students={students} />
          <TConvIns arr={arr} teachers={teachers} students={students} />
        </Charts>
        <div className={"forms"}>
          <h3>Faculty</h3>
          {teachers.map(teacher => (
            <EmpDetails key={teacher._id} teacher={teacher} />
          ))}
        </div>
      </div>
      <PopModal prompt={"Enter New Teacher"}>
        <FrmNewTeacher handleClick={handleClick} />
      </PopModal>
    </div>
  );
}
