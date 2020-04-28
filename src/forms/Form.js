import React from "react";
import {Button} from "../components/";
import "./form.css";
export default function Form({ children, submitFn, key = "" }) {
  const renderForm = () => {
    return React.Children.map(children, (child) => <>{child}</>);
  };
  return (
    <form className={"form"} onSubmit={submitFn} key={key}>
      {children}
      <Button type="submit" name={"Submit"} />
    </form>
  );
}
