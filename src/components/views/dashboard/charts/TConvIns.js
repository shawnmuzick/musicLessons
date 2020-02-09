import React from "react";
import { Bar } from "react-chartjs-2";

export default function TConvIns({ teachers, students }) {
    let a = students.map(s=>{
        return {teacher:s.teacher.name, conv:s.trial.trConv}
    })
    a.forEach(i =>{
        i.conv === true ? teachers.find(t => t.name === i.teacher).trConv++ : teachers.find(t => t.name === i.teacher).trFail++
    })
  let data = {
    labels: teachers.map(t => {
      return t.name || "";
    }),
    datasets: [
      {
        label: 'Instructors',
        data: teachers.map(t=>{
            return Math.round(t.getConvRate());
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
      text: "Trial Conversion by Instructor",
      display: true
    },
    responsive: true,
    maintainAspectRatio: false
  };
  return (
    <div className="chartWrap">
      <Bar data={data} options={options} />
    </div>
  );
}
