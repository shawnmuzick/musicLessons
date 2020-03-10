import React, { useState } from "react";
import Button from "../buttons/Button";
export default function FrmDelete({ fname, lname, id, fn }) {
  const [confirm, setConfirm] = useState("");
  const handleChange = e => {
    setConfirm(e.target.value);
  };
  const handleSubmit = () => {
    if (confirm === "DELETE") {
      fn(id);
    } else {
      return;
    }
    return;
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="formGroup">
        <p>{`Are you SURE you want to remove ${fname} ${lname}?`}</p>
      </div>
      <div className="formGroup">
        <p>Type DELETE to Confirm</p>
      </div>
      <div className="formGroup">
        <input type="text" onChange={handleChange} />
      </div>

      <Button type="submit" name="submit" />
    </form>
  );
}
