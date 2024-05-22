import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../Styles/AlertModal.css";

const AlertModal = ({ openAlertModal, handleCloseAlertModal, text }) => {
  // Function to handle key press events
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleCloseAlertModal();
    }
  };

  // Add event listener when modal is opened
  useEffect(() => {
    if (openAlertModal) {
      window.addEventListener("keydown", handleKeyPress);
    }

    // Remove event listener when modal is closed
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [openAlertModal, handleCloseAlertModal]);

  return (
    <Modal
      open={openAlertModal}
      onClose={handleCloseAlertModal}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box className="alertModal">
        {/* <h2 id="child-modal-title">Alert !</h2> */}
        <p id="child-modal-description">{text}</p>
        <Button onClick={handleCloseAlertModal}>ok</Button>
      </Box>
    </Modal>
  );
};

export default AlertModal;
