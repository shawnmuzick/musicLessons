import React from "react";

export default function Button({ setView, name }) {
  return (
    <button className={"MainMenu-button"} onClick={() => setView(name)}>
      {name}
    </button>
  );
}
