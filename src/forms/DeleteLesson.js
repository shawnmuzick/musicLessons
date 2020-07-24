import React, { useState } from "react";
import { Form, InputGroup } from "../forms";
export default function DeleteLesson({fn, id}) {
    const [confirm, setConfirm] = useState("");
    const handleChange = (e) => {
        setConfirm(e.target.value);
    };
    const handleSubmit = () => {
        if (confirm === "DELETE") {
            fn(id);
        } else {
            return;
        }
        return;
    };
    return (
        <Form submitFn={handleSubmit}>
            <InputGroup>
                <p>{`Are you SURE you want to cancel this lesson?`}</p>
            </InputGroup>
            <InputGroup>
                <p>Type DELETE to Confirm</p>
            </InputGroup>
            <InputGroup>
                <input type="text" onChange={handleChange} />
            </InputGroup>
        </Form>
    );
}
