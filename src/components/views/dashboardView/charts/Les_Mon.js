import React from "react";
import { Line } from "react-chartjs-2";
//Lessons by Instructor
export default function Les_Mon({ arr}) {
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
      position: "right"
    },
    title: {
      text: "Distribution of Lessons by Instructor",
      display: true
    },
    responsive:true,
    maintainAspectRatio:false
  };
  return <Line data={data} options={options} />;
}
