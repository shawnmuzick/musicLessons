import React from "react";

export default function Charts({ children }) {
  const renderChildren = () => {
    return React.Children.map(children, (child) => (
      <div className={"col"}>
        <div className={"colInn"}>{child}</div>
      </div>
    ));
  };
  return (
    <>
      <h3>Graphs:</h3>
      <div className="metrics">{renderChildren()}</div>
    </>
  );
}
