import React, { useState, forwardRef } from "react";
import { Box, Modal } from "@mui/material";
import Copy from "../Assests/AlertModal/copy.svg";
import Storesetting from "../Assests/AlertModal/storesetting.svg";
import Slide from "@mui/material/Slide";

const ConfirmModal = ({ headerText, otherMSG, open, onClose, onConfirm }) => {
  const myStyles = {
    width: "45vh",
    position: "absolute",
    top: "40%",
    left: "40%",
    transform: "translate(-50%, -50%)",
    fontFamily: "'CircularSTDMedium', sans-serif !important",
  };
  const imageDisplay = (headerText) => {
    switch (headerText) {
      case "The existing Variants of the selected Store 2 Must be same as selected Store 1 Variants. Do you want to proceed?":
        return Copy;
      case "The existing setting of the selected Store 2 will be erased and your setting will be copied from Store 1 to the selected Store 2. Do you want to proceed?":
        return Storesetting;
      case "Confirm Close Refund":
        return Copy
      default:
        return Copy;
      
    }
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
        className="delete-modal-outer-div"
        closeAfterTransition
      >
        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <Box className="delete-Box-modal" style={myStyles}>
            <div className="delete-modal">
              <div className="delete-modal-content">
                <img src={imageDisplay(headerText)} alt={`Copy-icon`} loading="lazy" />
                <span>
                  {headerText ? <>{headerText}</> :""}
                </span>
              </div>
              <div className="delete-modal-button">
                <button onClick={onClose}>Cancel</button>
                <button
                  onClick={onConfirm}
                  style={{ background: "#0a64f9", color: "#fff" }}
                >
                  OK
                </button>
              </div>
            </div>
          </Box>
        </Slide>
      </Modal>
    </>
  );
};

export default ConfirmModal;
