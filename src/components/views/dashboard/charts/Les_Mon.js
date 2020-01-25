import React from "react";
import { Line } from "react-chartjs-2";
//Lessons by Instructor
export default function Les_Mon({ arr }) {
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
