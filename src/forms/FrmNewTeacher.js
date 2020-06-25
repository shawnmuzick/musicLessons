import React, { useState } from "react";
import { Form, InputGroup } from "../forms/";
import { Teacher } from "../classes/classes";
export default function FrmNewTeacher({ handleClick }) {
  const [teacher, setTeacher] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const t = teacher;
    t[name] = value;
    setTeacher(t);
  };
  const handleImg = (e) => {
    const t = teacher;
    let reader = new FileReader();
    reader.onload = function () {
      var b64 = reader.result.split(",")[1];
      t.img = b64;
    };
    reader.readAsDataURL(e.target.files[0]);
    setTeacher(t);
  };
  const handleSubmit = (e) => {
    let img = teacher.img;
    const t = new Teacher(teacher);
    handleClick(t, img);
  };

  return (
    <Form submitFn={handleSubmit}>
      <InputGroup>
        <label htmlFor="img">Photo ID: </label>
        <input type="file" name="img" accept="image/jpeg" onChange={handleImg} />
      </InputGroup>
      <InputGroup>
        <label htmlFor="fname">First Name: </label>
        <input type="text" name="fname" onChange={handleChange} />
      </InputGroup>
      <InputGroup>
        <label htmlFor="lname">Last Name: </label>
        <input type="text" name="lname" onChange={handleChange} />
      </InputGroup>
      <InputGroup>
        <label htmlFor="phone">Phone: </label>
        <input type="text" name="phone" onChange={handleChange} />
      </InputGroup>
    </Form>
  );
}
