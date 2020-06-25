import React, { useState } from "react";
import { Button, Header } from "../components/";
import "./modal.css";
export default function Modal({ children, open, managed, btnTxt, headerTxt, imgSrc }) {
  const [state, setState] = useState(false);
  const handleModal = () => {
    setState(!state);
  };
  const renderImg = () => {
    return <img src={imgSrc} alt={""} />;
  };
  if (managed) {
    if (state) {
      return (
        <>
          <Button name={btnTxt} fn={handleModal} />
          <div className="backdrop">
            <dialog className={"modal"}>
              <div className={"modalWrapper"}>
                <div className={"modalWrapper"}>
                  <Header>
                    {renderImg()}
                    <h2>{headerTxt}</h2>
                    <Button name={"x"} fn={handleModal} />
                  </Header>
                  {children}
                </div>
              </div>
            </dialog>
          </div>
        </>
      );
    } else {
      return <Button name={btnTxt} fn={handleModal} />;
    }
  }
  if (open) {
    return (
      <div className="backdrop">
        <dialog className={"modal"}>
          <div className={"modalWrapper"}>{children}</div>
        </dialog>
      </div>
    );
  } else {
    return null;
  }
}
