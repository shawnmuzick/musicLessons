import React, { useState } from "react";
import Button from "../buttons/Button";
export default function AddNew({ handleClick }) {
  const [teacher, setTeacher] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    const t = teacher;
    t[name] = value;
    setTeacher(t);
  };
  const handleSubmit = e => {
    handleClick(teacher);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formGroup">
        <label htmlFor="fname">First Name: </label>
        <input type="text" name="fname" onChange={handleChange} />
      </div>
      <div className="formGroup">
        <label htmlFor="lname">Last Name: </label>
        <input type="text" name="lname" onChange={handleChange} />
      </div>
      <div className="formGroup">
        <label htmlFor="phone">Phone: </label>
        <input type="text" name="phone" onChange={handleChange} />
      </div>
      <Button type="submit" name={"Submit"} fn={handleSubmit} />
    </form>
  );
}
