import React from "react";
import './buttons.css';

export default function Button({ fn, name }) {
  return (
    <button className={"MainMenu-button"} onClick={() => fn(name)}>
      {name}
    </button>
  );
}
