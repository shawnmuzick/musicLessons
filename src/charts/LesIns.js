import React from "react";
import { Pie } from "react-chartjs-2";
//Lessons by Instructor
export default function LesIns({ teachers }) {
  let data = {
    labels: teachers.map(t => {
      return t.fname || "";
    }),
    datasets: [
      {
        data: teachers.map(t => {
          return t.lessons.length || 0;
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
      text: "Distribution of Lessons by Instructor",
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
