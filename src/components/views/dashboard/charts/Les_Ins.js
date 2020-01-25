import React from "react";
import { Pie } from "react-chartjs-2";
//Lessons by Instructor
export default function Les_Ins({ teachers }) {
  let data = {
    labels: teachers.map(t => {
      return t.name || "";
    }),
    datasets: [
      {
        data: teachers.map(t => {
          return t.value || 0;
        })
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
