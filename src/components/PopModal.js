import React, { useState } from "react";
import { Button, Header, Modal } from "../components/";
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
    return <img src={imgSrc} alt={""} />;
  };
  return (
    <>
      <Button name={checkForAlt()} fn={handleOpen} />
      <Modal open={open}>
        <div className={"modalWrapper"}>
          <Header>
            {renderImg()}
            <h2>{prompt}</h2>
            <Button name={"x"} fn={handleClose} />
          </Header>
          {children}
        </div>
      </Modal>
    </>
  );
}
