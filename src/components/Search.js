import React, { useState } from "react";
import "./search.css";
export default function Search({ arr, filter, search, setState }) {
  const [query, setQuery] = useState("");

  const handleInput = (e) => {
    console.log(search);
    const value = e.target.value;
    setQuery(value);
    search(arr, filter, value, setState);
  };
  return <input type="text" onChange={handleInput} value={query} className={"search"} id={"search"} />;
}
