import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "../Assests/Dashboard/cross.svg";

const ToastModal = ({ textToDisplay, position, autoClose, color, type }) => {
  return (
    <>
      <div
        class="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="toast-modal"
      >
        <div class="toast-header">
          <button
            type="button"
            class="ml-2 mb-1 close"
            data-dismiss="toast"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body">Hello, world! This is a toast message</div>
      </div>
    </>
  );
};

export default ToastModal;
