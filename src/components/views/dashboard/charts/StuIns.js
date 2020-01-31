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
    labels: teachers.map(t => {
      return t.name || "";
    }),
    datasets: [
      {
        data: teachers.map(t=>{
              return t.nStu;
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
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