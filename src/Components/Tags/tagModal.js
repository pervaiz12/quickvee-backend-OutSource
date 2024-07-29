import React from "react";
import { Box, Modal } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import CrossIcon from "../../Assests/Dashboard/cross.svg";

const myStyles = {
  width: "60%",
  position: "absolute",
  top: "47%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontFamily: "'CircularSTDMedium', sans-serif !important",
};

export default function TagModal(props) {
  return (
    <Modal
      open={props.showModal}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="view-category-item-modal" style={myStyles}>
        <div
          className="q-add-categories-section-header text-[18px]"
          style={{
            justifyContent: "space-between",
            fontFamily: "CircularSTDBook",
          }}
        >
          <span style={{ cursor: "unset" }}>
            {props.controltext ? "Update Tag" : "Add New Tag"}
          </span>

          <div>
            <img
              src={CrossIcon}
              alt="icon"
              className="  quic-btn-cancle w-6 h-6 cursor-pointer"
              onClick={() => props.handleClose()}
            />
          </div>
        </div>

        <div className="view-category-item-modal-header">
          <div
            className="title_attributes_section "
            style={{ margin: "1rem 1rem" }}
          >
            <label className="mb-2">Tag</label>
            <BasicTextFields
              value={props?.tagText?.Tag}
              name="Tag"
              placeholder="Enter Tag"
              onKeyPressFun={props.handleKeyPress}
              onChangeFun={props.onChangeGetData}
              handlePaste={props.handlePaste}
            />
            <span className="input-error">{props.errors?.tagError}</span>
          </div>
        </div>

        <div className="q-add-categories-section-middle-footer">
          <button
            onClick={
              props.controltext
                ? props.handleSubmitUpdateData
                : props.handleSubmitAddData
            }
            className="quic-btn quic-btn-save attributeUpdateBTN"
            disabled={props.loader}
          >
            {props.loader ? (
              <>
                <CircularProgress
                  color="inherit"
                  className="loaderIcon"
                  size={15}
                  width={15}
                />
                {props.controltext ? "Update" : "Add"}
              </>
            ) : (
              <>{props.controltext ? "Update" : "Add"}</>
            )}
          </button>
          <button
            onClick={props.handleClose}
            className="quic-btn quic-btn-cancle"
          >
            Cancel
          </button>
        </div>
      </Box>
    </Modal>
  );
}
