import React from 'react';
import { Student, Teacher } from "../classes/classes";
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
    iterateProps:(o)=>{
      return Object.keys(o).map((key) => {
        if (key !== "lessons") {
          return <p key={key}>{`${key}: ${o[key]}`}</p>;
        } else {
          return null;
        }
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
  export {maps};