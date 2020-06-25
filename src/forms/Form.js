import React from "react";
import {Button} from "../components/";
import "./form.css";
export default function Form({ children, submitFn, key = "" }) {
  return (
    <form className={"form"} onSubmit={submitFn} key={key}>
      {children}
      <Button type="submit" name={"Submit"} />
    </form>
  );
}
