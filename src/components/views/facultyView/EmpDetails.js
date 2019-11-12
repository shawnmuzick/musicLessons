import React from "react";

export default function EmpDetails(props) {
  const { name, phone } = props.teacher;
  return (
    <div id="employees">
      <details>
          <summary>{name}</summary>
        <p>Phone: {phone}</p>
      </details>
    </div>
  );
}
