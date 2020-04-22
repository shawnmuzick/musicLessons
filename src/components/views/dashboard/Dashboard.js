import React, { useEffect } from "react";
import axios from "axios";
import EmpDetails from "./EmpDetails";
import { FrmNewTeacher } from "../../../forms/";
import moment from "moment";
import PopModal from "../../PopModal";
import { LesIns, LesMon, StuIns, TConvIns, Charts } from "../../../charts";
import { Header } from "../../../components/";
export default function DashboardView({ teachers, students }) {
  let totalLessons = 0;
  let grossIncome = 0;
  let profit = 0;
  let arr = [];
  useEffect(() => {
    //clean lessons array on each render
    teachers.forEach((t) => {
      t.lessons = [];
      t.nStu = 0;
    });
  });
  for (let i = 0; i < 12; i++) {
    arr[i] = {
      name: moment().month(i).format("MMM"),
      value: 0,
    };
  }

  //link student lessons with teachers---------------------------------------
  students.forEach((s) => {
    teachers.forEach((t) => {
      if (t._id === s.teacher._id) {
        s.lessons.forEach((l) => {
          t.lessons.push(l);
          totalLessons++;
          grossIncome += s.tuition;
          profit += s.tuition - t.salary;
        });
        t.nStu++;
      }
    });
  });
  teachers.forEach((t) => {
    let arr2 = t.lessonsPerMonth();
    for (let i = 0; i < 12; i++) {
      arr[i].value += arr2[i];
    }
  });
  let conv = students.map((s) => {
    return s.trial.trConv;
  });
  let conversionRate = Math.round(
    (conv.reduce((x, y) => {
      return Number(x) + Number(y);
    }, 0) /
      conv.length) *
      100
  );
  const handleClick = (t, img) => {
    if (t.name === null || t.phone === null) {
      return;
    }
    axios
      .post(`/api/teachers`, {
        fname: t.fname,
        lname: t.lname,
        phone: t.phone,
        img: img,
      })
      .catch((err) => console.log(err));
  };
  const dbDelete = (_id) => {
    axios.delete(`/api/teachers${_id}`).catch((err) => console.log(err));
  };
  const renderEmployees = () => {
    return teachers.map((teacher) => <EmpDetails key={teacher._id} teacher={teacher} dbDelete={dbDelete} />);
  };
  return (
    <div className={"view"}>
      <Header>
        <h2>Dashboard</h2>
        <div className="dashHeader">
          <h3>Total Lessons: {totalLessons}</h3>
          <h3>Total Students: {students.length}</h3>
          <h3>Conversion Rate: {conversionRate}%</h3>
          <h3>Gross Income: ${Math.round(grossIncome * 100) / 100}</h3>
          <h3>Profit: ${Math.round(profit * 100) / 100}</h3>
        </div>
        <hr />
      </Header>
      <div className="wrapper">
        <Charts>
          <LesIns arr={arr} teachers={teachers} students={students} />
          <LesMon arr={arr} teachers={teachers} students={students} />
          <StuIns arr={arr} teachers={teachers} students={students} />
          <TConvIns arr={arr} teachers={teachers} students={students} />
        </Charts>
        <div className={"forms"}>
          <h3>Faculty</h3>
          {renderEmployees()}
        </div>
      </div>
      <PopModal prompt={"Enter New Teacher"}>
        <FrmNewTeacher handleClick={handleClick} />
      </PopModal>
    </div>
  );
}
