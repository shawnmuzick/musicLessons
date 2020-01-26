import React from "react";
import { Pie } from "react-chartjs-2";
//Lessons by Instructor
export default function StuIns({ students, teachers }) {
    students.forEach(s => {
        teachers.forEach(t => {
            if(s.teacher.name === t.name){
                t.nStu++
            }
        });
    });
  let data = {
    labels: students.map(s => {
      return s.teacher.name || "";
    }),
    datasets: [
      {
        data: teachers.map(t=>{
              return t.nStu;
          })
      }
    ]
  };
  let options = {
    legend: {
      position: "bottom"
    },
    title: {
      text: "Distribution of Students by Instructor",
      display: true
    },
    responsive: true,
    maintainAspectRatio: false
  };
  return (
    <div className="chartWrap">
      <Pie data={data} options={options} />
    </div>
  );
}
