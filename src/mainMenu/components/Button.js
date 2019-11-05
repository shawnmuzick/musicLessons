import React from "react";

export default function Button(props) {
  return (
    <button
      className={"MainMenu-button"}
      onClick={props.clickHandler}
      value={props.item}
    >
      {props.item}
    </button>
  );
}
