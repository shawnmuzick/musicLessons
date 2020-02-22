import React,{useState} from 'react'
import Button from "../buttons/Button";

export default function FrmNewStudent({handleClick}) {
    const [student, setStudent] = useState({});

    const handleChange = e => {
        const { name, value } = e.target;
        const s = student;
        s[name] = value;
        setStudent(s);
      };
      const handleSubmit = e => {
          e.preventDefault();
        handleClick(student);
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
        <div className="formGroup">
          <label htmlFor="phone">Instrument: </label>
          <input type="text" name="instrument" onChange={handleChange} />
        </div>
        <Button type="submit" name={"Submit"}/>
      </form>
    )
}
