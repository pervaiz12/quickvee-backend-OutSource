import React from "react";
import Grid from "@mui/material/Grid";
import { Box, Modal } from "@mui/material";

import backIcon from "../../Assests/Taxes/Left.svg";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
import CategoryListDropDown from "../../CommonComponents/CategoryListDropDown";

const myStyles = {
  width: "60%",
  position: "absolute",
  top: "47%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontFamily: "'CircularSTDMedium', sans-serif !important",
};

const MassInventoryUpdateModal = ({
  showModal,
  handleClose,
  handleCategoryChange,
  searchId,
  selectedStatus,
}) => {
  return (
    <>
      <Modal
        open={showModal}
        onClose={handleClose}
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
            <span onClick={() => handleClose()}>
              <img src={backIcon} alt="Timesheet" className="w-6 h-6" />
              <span>Mass Inventory Update</span>
            </span>
          </div>

          <div className="view-category-item-modal-header">
            <div
              className="title_attributes_section "
              style={{ margin: "1rem 1rem" }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <CategoryListDropDown
                    type="category"
                    onCategoryChange={handleCategoryChange}
                    searchId={searchId}
                    selectedStatus={selectedStatus}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  className="category-checkmark-div"
                >
                  <label className="category-checkmark-label">
                    Track Quantity
                    <input
                      type="checkbox"
                      // checked={
                      //     item.cat_show_status === "0" ||
                      //     item.cat_show_status === "1"
                      // }
                      // onChange={() =>
                      //   handleOnlineChange(
                      //     item
                      //   )
                      // }
                    />
                    <span className="category-checkmark"></span>
                  </label>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  className="category-checkmark-div"
                >
                  <label className="category-checkmark-label">
                    Continue Selling
                    <input
                      type="checkbox"
                      // checked={
                      //     item.cat_show_status === "0" ||
                      //     item.cat_show_status === "1"
                      // }
                      // onChange={() =>
                      //   handleOnlineChange(
                      //     item
                      //   )
                      // }
                    />
                    <span className="category-checkmark"></span>
                  </label>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  className="category-checkmark-div"
                >
                  <label className="category-checkmark-label">
                    Check ID
                    <input
                      type="checkbox"
                      // checked={
                      //     item.cat_show_status === "0" ||
                      //     item.cat_show_status === "1"
                      // }
                      // onChange={() =>
                      //   handleOnlineChange(
                      //     item
                      //   )
                      // }
                    />
                    <span className="category-checkmark"></span>
                  </label>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  className="category-checkmark-div"
                >
                  <label className="category-checkmark-label">
                    Disable
                    <input
                      type="checkbox"
                      // checked={
                      //     item.cat_show_status === "0" ||
                      //     item.cat_show_status === "1"
                      // }
                      // onChange={() =>
                      //   handleOnlineChange(
                      //     item
                      //   )
                      // }
                    />
                    <span className="category-checkmark"></span>
                  </label>
                </Grid>
              </Grid>
            </div>
          </div>

          <div className="q-add-categories-section-middle-footer">
            <button className="quic-btn quic-btn-save attributeUpdateBTN">
              Enable
            </button>
            <button className="quic-btn quic-btn-cancle">Disable</button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default MassInventoryUpdateModal;
