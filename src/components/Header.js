import React from "react";
export default function Header({children }) {
  const renderChildren = () => {
    return React.Children.map(children, (child) => <>{child}</>);
  };

  return (
    <header className="App-header">
        {renderChildren()}
    </header>
  );
}
