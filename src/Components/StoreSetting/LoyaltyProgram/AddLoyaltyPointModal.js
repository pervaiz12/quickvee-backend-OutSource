import React from "react";
import { Box, FormControl, Modal } from "@mui/material";
import { CircularProgress, Grid } from "@mui/material";
import BasicTextFields from "../../../reuseableComponents/TextInputField";
import CrossIcon from "../../../Assests/Dashboard/cross.svg";
import DatePickerSelect from "./DatePickerSelect";
import Switch from "@mui/material/Switch";
import { padding } from "@mui/system";
import dayjs from "dayjs";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
const myStyles = {
  width: "60%",
  position: "absolute",
  top: "47%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontFamily: "'CircularSTDMedium', sans-serif !important",
};
const stylePadding = {
  paddingTop: "20px",
};

export default function AddLoyaltyPointModal(props) {
  function onDateRangeChange() {}
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
            {props?.updateChecked
              ? "Update Loyalty Program"
              : "Add Loyalty Program"}
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
            {/* ============================================== */}
            <Grid item xs={12} sm={6}>
              <Grid container>
                <Grid item xs={12} style={stylePadding}>
                  <h5
                    style={{ marginBottom: 0 }}
                    className="StoreSetting_heading-menu"
                  >
                    Enable/Disable
                  </h5>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="fr" style={stylePadding}>
                {/* {loader ? (
              <CircularProgress width={20} size={20} />
            ) : ( */}
                <Switch
                  // {...label}
                  name="cost_method"
                  checked={props.enabledPromotionalId}
                  // checked={
                  //   !!res?.enable_promotion
                  //     ? !res?.enable_promotion
                  //       ? false
                  //       : true
                  //     : false
                  // }
                  onChange={props.handleCheckedProEnabledSwitch}
                />
                {/* )} */}
              </div>
            </Grid>
            {/* ============================================== */}
            <Grid item xs={12} sm={6}>
              <label>Bonus Point Promotion Name</label>
              <BasicTextFields
                type="text"
                // placeholder="$1 ="
                maxLength={15}
                // name="default_delvery_setup"
                // id="delvery_setup"
                name="promotionName"
                value={props.addPrmotionName?.promotionName}
                onChangeFun={props.onChangeAddLoyality}
                disable={props?.updateChecked ? true : false}
              />
              <span className="input-error">
                {props.errors.BonusPointError}
              </span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Bonus Points Awarded Per Dollar Spent</label>
              <BasicTextFields
                type="text"
                // placeholder=""
                maxLength={9}
                name="DollarSpent"
                // name="default_delvery_setup"
                // id="delvery_setup"
                value={props.addPrmotionName?.DollarSpent}
                onChangeFun={props.onChangeAddLoyality}
              />
              <span className="input-error">
                {props.errors.BonusPointAwardError}
              </span>
            </Grid>
            {/* ===========date ===============*/}
            <Grid>
              {/* <DateRangeComponent onDateRangeChange={onDateRangeChange} /> */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Start Date</label>

              <DatePickerSelect
                name="startDate"
                minDate={dayjs()}
                value={dayjs(props.dateValid?.startDate)}
                onChange={props.onChangeStartDate}
                format="YYYY-DD-MM"
              />

              <span className="input-error">{props.errors.startDateError}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>End Date</label>
              <DatePickerSelect
                name="endDate"
                className="q_input_details"
                minDate={dayjs()}
                value={dayjs(props.dateValid?.endDate)}
                onChange={props.onChangeEndDate}
                format="YYYY-DD-MM"
              />
              <span className="input-error">{props.errors.EndDateError}</span>
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
            onClick={
              props.updateChecked
                ? props.handleUpdateLoyalty
                : props.handleSubmitAddLoyalty
            }
            // onClick={
            //   props.controltext
            //     ? props.handleSubmitUpdateData
            //     : props.handleSubmitAddData
            // }
            className="quic-btn quic-btn-save attributeUpdateBTN"
            disabled={props.loader}
          >
            {/* Add */}
            {props.loader ? (
              <>
                <CircularProgress
                  color="inherit"
                  className="loaderIcon"
                  size={15}
                  width={15}
                />
                {props.updateChecked ? "Update" : "Add"}
              </>
            ) : (
              <>{props.updateChecked ? "Update" : "Add"}</>
            )}
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
