import React from "react";
import StudentItem from "./StudentItem";

export default function List(props) {
  const students = props.students;
  const teacher = props.name;
  const availability = props.availability;
  let date = props.date;
  let index = date.getDay();
  return (
    <div>
      {availability[index] !== null ? (
        <div>
          <h2>{teacher}</h2>
          {availability[index].map(item => (
            <li className={"Available-List"}>
              <div>{item}</div>
              <StudentItem
                day={index}
                time={item}
                teacher={teacher}
                students={students}
              />
            </li>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
