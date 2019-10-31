import React from "react";

export default function EmpDetails(props) {
  const { name, id, phone } = props.teacher;
  return (
    <div id="employees">
      <details>
          <summary>{name}</summary>
        <p>ID: {id}</p>
        <p>Phone: {phone}</p>
      </details>
    </div>
  );
}
