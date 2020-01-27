import React from "react";
import { Line } from "react-chartjs-2";
//Lessons by Instructor
export default function LesMon({ arr }) {
  let data = {
    labels: arr.map(m => {
      return m.name;
    }),
    datasets: [
      {
        data: arr.map(m => {
          return m.value;
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
      text: "Lessons per Month",
      display: true
    },
    responsive: true,
    maintainAspectRatio: false
  };
  return (
    <div className="chartWrap">
      <Line data={data} options={options} />
    </div>
  );
}
