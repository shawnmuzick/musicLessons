import React from "react";

export default function StudentItem(props) {
  const students = props.students;
  const teacher = props.teacher;
  const time = props.time;
  const day = props.day;
  return (
    <div>
      {students.map(student =>
        student.teacher === teacher ? (
          student.lessonTime === time ? (
            student.lessonDay === day ? (
              <p>{student.name}</p>
            ) : (
              <div></div>
            )
          ) : (
            <div></div>
          )
        ) : (
          <div> </div>
        )
      )}
    </div>
  );
}
