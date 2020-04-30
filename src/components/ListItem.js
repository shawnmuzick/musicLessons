import React from "react";
import './listItem.css';
export default function ListItem({children}) {
  return <li className={"listItem"}>{children}</li>;
}
