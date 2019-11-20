import React from "react";

export default function EmpDetails({ name, phone }) {
  return (
    <div id="employees">
      <details>
          <summary>{name}</summary>
        <p>Phone: {phone}</p>
      </details>
    </div>
  );
}
