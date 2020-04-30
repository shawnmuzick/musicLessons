import React, { useState } from "react";
import "./search.css";
export default function Search({ arr, filter, search }) {
  const [query, setQuery] = useState("");

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    search(arr, filter, value);
  };
  return <input type="text" onChange={handleInput} value={query} className={"search"} id={"search"} />;
}
