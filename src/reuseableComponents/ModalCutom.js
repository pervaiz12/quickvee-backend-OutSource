import React, { useState } from "react";
import { Box, Modal,Button  } from '@mui/material';
import CrossIcon from "../Assests/Dashboard/cross.svg";

const  ModalCutom = ({headerText}) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const myStyles = {
    width: "60%",
    position: "absolute",
    top: "47%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontFamily: "'CircularSTDMedium', sans-serif !important",
  };

    
  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
     <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="view-category-item-modal" style={myStyles}>
            <div className="q-add-categories-section-header text-[18px]" style={{ justifyContent:"space-between" ,fontFamily:"CircularSTDBook" }}>
              <span>
                <span>{headerText}</span>
              </span>
              <div>
                <div className="flex justify-between gap-4">

                
              <img src={CrossIcon}
                    alt="icon"
                    className="  quic-btn-cancle w-6 h-6"
                    onClick={() => handleClose()}
                  />
                </div>
              </div>
            </div>
            <div className="view-category-item-modal-header">
 
            </div>

            <div className="q-add-categories-section-middles-footer">
              <button onClick={() => handleClose()} className="quic-btn quic-btn-ok" >
                Ok{" "}
              </button>
            </div>
          </Box>
        </Modal>


        
    </>
  )
}

export default ModalCutom