import React, { useState, useEffect } from "react";
import axios from "axios";
import EmpDetails from "./EmpDetails";
import AddNew from "./forms/AddNew";
import Charts from "./charts/Charts";
import DashHeader from "./DashHeader";
import moment from "moment";
import { Teacher, Student } from "../classes";
import Modal from "@material-ui/core/Modal";
export default function DashboardView() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
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
    console.log(a);
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
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={"view"}>
      <h2>Dashboard</h2>
      <DashHeader
        totalLessons={totalLessons}
        totalStudents={students.length}
        conversionRate={conversionRate}
      />
      <hr />
      <h3>Graphs:</h3>
      <div className="wrapper">
        <Charts arr={arr} teachers={teachers} students={students} />
        <div className={"forms"}>
          <h3>Faculty</h3>
          <div className="formsWrap">
            {teachers.map(teacher => (
              <EmpDetails key={teacher._id} teacher={teacher} />
            ))}
            <button onClick={handleOpen}>Add New</button>
            <Modal open={open} className={"modal"}>
              <div className={"modalWrapper"}>
                <div className="modalHeader">
                  <h2>Enter New Teacher Details</h2>
                  <button onClick={handleClose}>x</button>
                </div>
                <AddNew handleClick={handleClick} />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
