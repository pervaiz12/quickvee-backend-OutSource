import React from "react";
import { Box, Modal } from "@mui/material";
import { CircularProgress, Grid } from "@mui/material";
import BasicTextFields from "../../../reuseableComponents/TextInputField";
import CrossIcon from "../../../Assests/Dashboard/cross.svg";
import DatePickerSelect from "./DatePickerSelect";
const myStyles = {
  width: "60%",
  position: "absolute",
  top: "47%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontFamily: "'CircularSTDMedium', sans-serif !important",
};

export default function AddLoyaltyPointModal(props) {
  return (
    <Modal
      open={props.openAddModel}
      onClose={props.handleCloseAddModal}
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
            Add Loyalty Program
            {/* {props.controltext ? "Update Brand" : "Add New Brand"} */}
          </span>

          <div>
            <img
              src={CrossIcon}
              alt="icon"
              className="  quic-btn-cancle w-6 h-6 cursor-pointer"
              onClick={() => props.handleCloseAddModal()}
            />
          </div>
        </div>

        <div className="view-category-item-modal-header">
          <Grid container spacing={3} sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item xs={12} sm={6}>
              <label>Points Awarded Per Dollar Spent</label>
              <BasicTextFields
                type="text"
                placeholder="$1 ="
                maxLength={8}
                // name="default_delvery_setup"
                // id="delvery_setup"
                // value={deleveryChange}
                // onChangeFun={setDelveryChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Points Awarded Per Dollar Spent</label>
              <BasicTextFields
                type="text"
                placeholder="$1 ="
                maxLength={8}
                // name="default_delvery_setup"
                // id="delvery_setup"
                // value={deleveryChange}
                // onChangeFun={setDelveryChange}
              />
            </Grid>
            {/* ===========date ===============*/}
            <Grid item xs={12} sm={6}>
              <label>Points Awarded Per Dollar Spent</label>
              <DatePickerSelect />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Points Awarded Per Dollar Spent</label>
              <DatePickerSelect />
            </Grid>
            {/* ===========date =============== */}
          </Grid>
          {/* <div
            className="title_attributes_section "
            style={{ margin: "1rem 1rem" }}
          >
            <label className="mb-2">Brand</label>
            <BasicTextFields
                value={props?.brandText?.brand}
              name="brand"
              placeholder="Enter Brand"
              maxLength={35}
                onKeyPressFun={props.handleKeyPress}
                onChangeFun={props.onChangeGetData}
                handlePaste={props.handlePaste}
            />
            <span className="input-error">{props.errors?.brandError}</span>
          </div> */}
        </div>

        <div className="q-add-categories-section-middle-footer">
          <button
            // onClick={
            //   props.controltext
            //     ? props.handleSubmitUpdateData
            //     : props.handleSubmitAddData
            // }
            className="quic-btn quic-btn-save attributeUpdateBTN"
            // disabled={props.loader}
          >
            Add
            {/* {props.loader ? (
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
            )} */}
          </button>
          <button
            onClick={props.handleCloseAddModal}
            className="quic-btn quic-btn-cancle"
          >
            Cancel
          </button>
        </div>
      </Box>
    </Modal>
  );
}
