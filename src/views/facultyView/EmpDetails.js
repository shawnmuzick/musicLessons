import React from "react";

export default function EmpDetails(props) {
  const { name, id, phone } = props.teacher;
  return (
    <div id="employees">
      <h2>{name}</h2>
      <details>
          <summary>Contact and Info</summary>
        <p>ID: {id}</p>
        <p>Phone: {phone}</p>
      </details>
    </div>
  );
}
