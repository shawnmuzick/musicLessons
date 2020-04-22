import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { Button, Header } from "../components/";
import "./modal.css";
export default function PopModal({ prompt, bName, children, imgSrc }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const checkForAlt = () => {
    if (!bName) {
      return prompt;
    } else {
      return bName;
    }
  };
  const renderImg = () => {
    return <img src={imgSrc} />;
  };
  return (
    <>
      <Button name={checkForAlt()} fn={handleOpen} />
      <Modal open={open} className={"modal"}>
        <div className={"modalWrapper"}>
          <Header>
            <div className="modalHeader">
              {renderImg()}
              <h2>{prompt}</h2>
              <Button name={"x"} fn={handleClose} />
            </div>
          </Header>
          {children}
        </div>
      </Modal>
    </>
  );
}
