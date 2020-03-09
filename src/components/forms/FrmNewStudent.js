import React, { useState } from "react";
import Button from "../buttons/Button";
import { Student } from "../views/classes";
import SelectInstrument from "./SelectInstrument";
export default function FrmNewStudent({ handleClick }) {
  const [student, setStudent] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    const s = student;
    s[name] = value;
    setStudent(s);
  };
  const handleImg = e => {
    const s = student;
    let reader = new FileReader();
    reader.onload = function() {
      var b64 = reader.result.split(',')[1];
      s.img = b64;
    };
    reader.readAsDataURL(e.target.files[0]);
    setStudent(s);
  };
  const handleTrial = e => {
    const s = student;
    s.trial = {};
    e.target.value === "true"
      ? (s.trial.trConv = true)
      : (s.trial.trConv = false);
    setStudent(s);
  };
  const handleSubmit = e => {
    let img = student.img;
    const s = new Student(student);
    handleClick(s, img);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formGroup">
        <label htmlFor="img">Photo ID: </label>
        <input
          type="file"
          name="img"
          accept="image/jpeg"
          onChange={handleImg}
        />
      </div>
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
      <div className="formGroup">
        <label htmlFor="tuition">Tuition: </label>
        <input
          type="number"
          step="0.01"
          name="tuition"
          onChange={handleChange}
        />
      </div>
      <div className="formGroup">
        <label htmlFor="instrument">Instrument: </label>
        <SelectInstrument fn={handleChange} />
      </div>
      <div className="formGroup">
        <label htmlFor="trial">Converted Trial?: </label>
        <select name="trial" onChange={handleTrial}>
          <option>Select an Option</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      <Button type="submit" name={"Submit"} />
    </form>
  );
}
