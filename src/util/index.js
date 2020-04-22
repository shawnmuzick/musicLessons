import axios from "axios";
import { Student, Teacher } from "../classes/classes";
const fetches = {
  getStudents: () => {
    return axios.get("/api/students").then((res) => maps.makeStudents(res.data));
  },
  deleteStudentById: (id) => {
    return axios.delete(`/api/students${id}`).catch((err) => console.log(err));
  },
};
const maps = {
  makeStudents: (arr) => {
    return arr.map((s) => {
      return new Student(s);
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
const filters = {
  studentsByTeacher: (arr, teacher)=>{
    return arr.filter(s=> s.teacher._id === teacher._id);
  }
}
export { fetches, maps, filters };
