import React from "react";
import { ModalProps } from "../../models";
import "./style.css";

function Modal(props: ModalProps) {
  const { setOpenModal, title, description, onConfirm } = props;
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>{title}</h1>
        </div>
        <div className="body">
          <p>{description}</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={onConfirm}>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
