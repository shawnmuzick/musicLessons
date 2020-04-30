import axios from "axios";
import { maps } from "./maps";
const fetches = {
  //get all students and teachers
  getAll: () => {
    return axios.all([axios.get("/api/teachers"), axios.get("/api/students")]).then(
      axios.spread((...res) => {
        const a = maps.makeTeachers(res[0].data);
        const b = maps.makeStudents(res[1].data);
        return [a, b];
      })
    );
  },
  //student functions
  getStudents: () => {
    return axios.get("/api/students").then((res) => maps.makeStudents(res.data));
  },
  getStudentById: (id) => {
    return axios.get(`/api/students${id}`).catch((err) => console.log(err));
  },
  postStudent: (s) => {
    axios.post(`/api/students`, { s, img: s.img }).catch((err) => console.log(err));
  },
  putStudent: (s) => {
    //placeholder
  },
  deleteStudentById: (id) => {
    return axios.delete(`/api/students${id}`).catch((err) => console.log(err));
  },
  //teacher functions
  getTeachers: () => {
    return axios.get("/api/teachers").then((res) => maps.makeTeachers(res.data));
  },
  getTeacherById: (id) => {
    return axios.get(`/api/teachers${id}`);
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
  //event functions
  getEvents: () => {
    return axios.get("/lessons");
  },
  getEventById: (id) => {
    return axios.get(`/lessons${id}`);
  },
  postEvent: (e, stID) => {
    return axios.post(`/api/lessons`, {
      event: e,
      stID,
    });
  },
  putEvent: (e, stID) => {
    return axios.put(`/api/lessons`, {
      event: e,
      stID,
    });
  },
  deleteEventById: (id) => {
    return axios.delete(`/api/lessons${id}`);
  },
  //user functions
  getUsers: () => {
    return axios.get("/api/users");
  },
  postUserLogin: (username, password) => {
    return axios.post("/login", {
      username,
      password,
    });
  },
};
export { fetches };
