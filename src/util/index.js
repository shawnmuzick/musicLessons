import axios from "axios";
import { Student, Teacher, Event } from "../classes/classes";
const fetches = {
  getAll: () => {
    return axios.all([axios.get("/api/teachers"), axios.get("/api/students")]).then(
      axios.spread((...res) => {
        const a = maps.makeTeachers(res[0].data);
        const b = maps.makeStudents(res[1].data);
        return [a, b];
      })
    );
  },
  getStudents: () => {
    return axios.get("/api/students").then((res) => maps.makeStudents(res.data));
  },
  getStudentById: (id) => {
    return axios.get(`/api/students${id}`).catch((err) => console.log(err));
  },
  postStudent: (s) => {
    axios.post(`/api/students`, { s, img: s.img }).catch((err) => console.log(err));
  },
  deleteStudentById: (id) => {
    return axios.delete(`/api/students${id}`).catch((err) => console.log(err));
  },
  getTeachers: () => {
    return axios.get("/api/teachers").then((res) => maps.makeTeachers(res.data));
  },
  getTeacherById: (id) => {
    return axios.get(`/api/teachers${id}`).catch((err) => console.log(err));
  },
  postTeacher: (t) => {
    return axios
      .post(`/api/teachers`, {
        fname: t.fname,
        lname: t.lname,
        phone: t.phone,
        img: t.img,
      })
      .catch((err) => console.log(err));
  },
  putTeacherById: (teacher) => {
    return axios
      .put(`/api/teachers${teacher._id}`, { phone: teacher.phone, hours: teacher.hours })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  },
  deleteTeacherById: (id) => {
    return axios.delete(`/api/teachers${id}`).catch((err) => console.log(err));
  },
  getUsers:()=>{
    //placeholder for fetching user list
  },
  postUserLogin:(username, password)=>{
    return fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => res.json())
  }
};
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
  studentsByTeacher: (arr, teacher) => {
    return arr.filter((s) => s.teacher._id === teacher._id);
  },
};
export { fetches, maps, filters, Student, Teacher, Event };
