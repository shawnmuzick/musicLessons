import React from "react";

export default function DashHeader({
  totalLessons,
  totalStudents,
  conversionRate,
  grossIncome
}) {
  return (
    <>
      <h2>Dashboard</h2>
      <div className="dashHeader">
        <h3>Total Lessons: {totalLessons}</h3>
        <h3>Total Students: {totalStudents}</h3>
        <h3>Conversion Rate: {conversionRate}%</h3>
        <h3>Gross Income: ${Math.round(grossIncome *100)/100}</h3>
      </div>
      <hr />
    </>
  );
}
