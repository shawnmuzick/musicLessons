import React from "react";

export default function Button(props) {
  const {clickHandler, item} = props;
  return (
    <button
      className={"MainMenu-button"}
      onClick={clickHandler}
      value={item}
    >
      {item}
    </button>
  );
}
