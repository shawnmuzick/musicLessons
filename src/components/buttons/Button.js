import React from "react";
import "./buttons.css";

export default function Button({
  fn = () => {
    return;
  },
  name
}) {
  return (
    <button className={"MainMenu-button"} onClick={() => fn(name)}>
      {name}
    </button>
  );
}
