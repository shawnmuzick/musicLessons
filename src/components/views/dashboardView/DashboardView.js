import React, { useState, useEffect } from "react";

export default function DashboardView() {
  const [SRC, setSRC] = useState([]);
  useEffect(() => {
    fetch("/api/teachers")
      .then(res => res.json())
      .then(data => {
        setSRC(data);
      })
      .catch(err => console.log(err));
  }, []);
  let totalLessons = 0;
  const sum = () => {
    totalLessons++;
  };
  SRC.map(item => {
    item.lessons.map(lesson => {
      sum();
    });
  });
  return (
    <div id="DashboardView" className={"view"}>
      <h2>Dashboard</h2>
      <div className="metrics">
        <h3>Total Lessons: {totalLessons} </h3>
        <h3>Trial Conversion: </h3>
      </div>
    </div>
  );
}
