import React from "react";

export default function DashHeader({
  totalLessons,
  totalStudents,
  conversionRate
}) {
  return (
    <div className="dashHeader">
      <h3>Metrics:</h3>
      <h3>Total Lessons: {totalLessons}</h3>
      <h3>Total Students: {totalStudents}</h3>
      <h3>Conversion Rate: {conversionRate}%</h3>
    </div>
  );
}
