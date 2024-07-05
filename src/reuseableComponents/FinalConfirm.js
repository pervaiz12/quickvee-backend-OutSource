import React, { useState, forwardRef } from "react";
import { Box, Modal } from "@mui/material";
import Final from "../Assests/AlertModal/final.svg";
import Slide from "@mui/material/Slide";

const FinalConfirm = ({ headerText, otherMSG, open, onClose, onConfirm }) => {
  const myStyles = {
    width: "45vh",
    position: "absolute",
    top: "40%",
    left: "40%",
    transform: "translate(-50%, -50%)",
    fontFamily: "'CircularSTDMedium', sans-serif !important",
  };
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
                <img src={Final} alt={`Delete-icon`} loading="lazy" />
                <span>
                  {headerText ? <>{headerText}</> :""}
                </span>
              </div>
              <div className="delete-modal-button">
                <button onClick={onClose}>Cancel</button>
                <button
                  onClick={onConfirm}
                  style={{ background: " #0a64f9", color: "#fff" }}
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

export default FinalConfirm;
