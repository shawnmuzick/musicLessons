import React from "react";
import './inputGroup.css';
export default function InputGroup({ children, key ='' }) {
  return <div className="inputGroup" key ={key}>{children}</div>;
}
