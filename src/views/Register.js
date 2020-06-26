import React, { useState } from "react";
import { Form, InputGroup } from "../forms";
import { fetches } from "../util/";

export default function Register({ setView }) {
    const [values, setValues] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        let obj = values;
        obj[name] = value;
        setValues(obj);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        fetches
            .postUserRegister(values.username, values.password)
            .then((data) => {
                if (data.status === 200) {
                    setView("Login");
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <Form title={"Register"} submitFn={handleSubmit}>
            <h2>Register</h2>
            <InputGroup>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                />
            </InputGroup>
            <InputGroup>
                <label htmlFor="password">Password:</label>
                <input
                    type="text"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                />
            </InputGroup>
        </Form>
    );
}
