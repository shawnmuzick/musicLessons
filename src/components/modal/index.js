import React, { useState }  from "react";
import Modal from "@material-ui/core/Modal";
import Button from "../buttons/Button";
import "./modal.css";
export default function PopModal({prompt, children }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
    <Button name={prompt} fn={handleOpen} />
    <Modal open={open} className={"modal"}>
      <div className={"modalWrapper"}>
        <div className="modalHeader">
          <h2>{prompt}</h2>
          <Button name={"x"} fn={handleClose} />
        </div>
        {children}
      </div>
    </Modal>
    </>
  );
}
