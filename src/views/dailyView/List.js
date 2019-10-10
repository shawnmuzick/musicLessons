import React from "react";

export default function List(props) {
  const name = props.name;
  const availability = props.availability;
  let date = props.date
  let index = date.getDay();
  return (
    <div>
      {availability[index] !== null ? (
        <div>
          <h2>{name}</h2>
          {availability[index].map(item => (
            <li className={"Available-List"}>{item}</li>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
