import React from "react";

export default function Charts({ children }) {
  return (
    <>
      <h3>Graphs:</h3>
      <div className="metrics">
        {React.Children.map(children, child => (
          <div className={"col"}>
            <div className={"colInn"}>{child}</div>
          </div>
        ))}
      </div>
    </>
  );
}
