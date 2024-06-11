import React, { useState, forwardRef } from "react";
import { Box, Modal } from "@mui/material";
import DeleteIcon from "../Assests/Category/deleteIcon.svg";
import Slide from "@mui/material/Slide";

const AlertModal = ({ headerText, otherMSG, open, onClose }) => {
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
                {/* <img src={DeleteIcon} alt={`Delete-icon`} loading="lazy" /> */}
                <span>
                  {headerText ? headerText : ""} <br/> {otherMSG ? <><br/>{otherMSG}</> :""}
                </span>
              </div>
              <div className="info_alertBTN">
              <button className="save_btn" onClick={onClose}>Ok</button>
              </div>
            </div>
          </Box>
        </Slide>
      </Modal>
    </>
  );
};

export default AlertModal;
