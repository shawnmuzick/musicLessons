import React from "react";
import "./buttons.css";

export default function Button({
  fn = () => {
    return;
  },
  name,
  value = ''
}) {
  return (
    <button
      className={"MainMenu-button"}
      onClick={() => {
        if (name !== "x"){
          fn(name);
        }else{
          fn(value);
        }
      }}
    >
      {name}
    </button>
  );
}
