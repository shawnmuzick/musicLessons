import React from "react";
import { Student, Teacher } from "../classes/classes";
import { InputGroup } from "../forms/";
import { ListItem } from "../components/";
const maps = {
  makeStudents: (arr) => {
    return arr.map((s) => {
      return new Student(s);
    });
  },
  makeTeachers: (arr) => {
    return arr.map((s) => {
      return new Teacher(s);
    });
  },
  iterateProps: (o) => {
    return Object.keys(o).map((key) => {
      if (key !== "lessons") {
        return <p key={key}>{`${key}: ${o[key]}`}</p>;
      } else {
        return null;
      }
    });
  },
  renderCheckboxes: (list, state, handler) => {
    return list.map((i) => {
      return (
        <InputGroup>
          <input type="checkbox" name={i} id={i} value={state[i]} onChange={handler} />
          {i}
        </InputGroup>
      );
    });
  },
  renderProfile: (arr, props) => {
    return arr.map((s) => {
      return (
        <details>
          <summary>{`${s.fname} ${s.lname}`}</summary>
          <ListItem>
            <div className={"photoID"}>
              <img src={`/assets/img/students/${s._id}.jpg`} alt={`${s.fname}`} />
            </div>
            {props(s)}
          </ListItem>
        </details>
      );
    });
  },
  addTeacherLessons: (students, teacher) => {
    students.forEach((s) => {
      if (teacher._id === s.teacher._id) {
        s.lessons.forEach((l) => {
          teacher.lessons.push(l);
        });
      }
    });
  },
};
export { maps };
