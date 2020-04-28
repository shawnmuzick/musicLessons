import React, { useState } from "react";
import { Button } from "../components";
import { Form, InputGroup } from "../forms";
import { fetches } from "../util";
import axios from "axios";
export default function Login({ setUser, setView }) {
  const [values, setValues] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    let obj = values;
    obj[name] = value;
    setValues(obj);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: values.username, password: values.password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        if (data.role === "admin") {
          setView("Dashboard");
        } else {
          setView("Calendar");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Form title={"Login"} submitFn={handleSubmit}>
      <h2>Login</h2>
      <InputGroup>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" value={values.username} onChange={handleChange} />
      </InputGroup>
      <InputGroup>
        <label htmlFor="password">Password:</label>
        <input type="text" name="password" value={values.password} onChange={handleChange} />
      </InputGroup>
    </Form>
  );
}
