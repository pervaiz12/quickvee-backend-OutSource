import React, { memo, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, CircularProgress, Modal } from "@mui/material";

import backIcon from "../../Assests/Taxes/Left.svg";
import CategoryListDropDown from "../../CommonComponents/CategoryListDropDown";
import axios from "axios";
import { BASE_URL, MASS_INVENTORY_UPDATE } from "../../Constants/Config";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";

import CloseIcon from "../../Assests/Dashboard/cross.svg";

const myStyles = {
  width: "60%",
  position: "absolute",
  top: "47%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontFamily: "'CircularSTDMedium', sans-serif !important",
};

const MassInventoryUpdateModal = memo(({ showModal, handleClose }) => {
  const { userTypeData, LoginGetDashBoardRecordJson } = useAuthDetails();
  const [categoryId, setCategoryId] = useState("all");
  const [loaders, setLoaders] = useState({
    enable: false,
    disable: false,
  });

  const [options, setOptions] = useState({
    trackQuantity: false,
    continueSelling: false,
    checkId: false,
    disable: false,
    foodStampable: false,
  });

  const handleCategory = (catId) => {
    setCategoryId(catId);
  };

  const handleCheckbox = (type) => {
    setOptions((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSubmit = async (type) => {
    try {
      const bool = Object.values(options).every((bool) => !bool);

      if (bool) {
        ToastifyAlert("Please select atleast one option", "error");
        return;
      }

      setLoaders({
        enable: type === "1",
        disable: type === "0",
      });

      const { token } = userTypeData;
      const formData = new FormData();
      // formData.append(
      //   "merchant_id",
      //   LoginGetDashBoardRecordJson?.data?.merchant_id
      // );

      const data = [
        {
          merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
          cat_id: categoryId,
          track_qty: options.trackQuantity ? "1" : "0",
          continue_sell: options.continueSelling ? "1" : "0",
          check_id: options.checkId ? "1" : "0",
          check_dis: options.disable ? "1" : "0",
          check_food_stampable: options.foodStampable ? "1" : "0",
          inv_status: type === "1" ? "1" : "0",
        },
      ];

      // console.log("data: ", data, type);
      // return;

      formData.append("data", JSON.stringify(data));
      formData.append("token_id", userTypeData?.token_id);
      formData.append("login_type", userTypeData?.login_type);

      // formData.append("login_type", userTypeData.login_type);
      // formData.append("cat_id", categoryId);
      // formData.append("track_qty", options.trackQuantity ? 1 : 0);
      // formData.append("continue_sell", options.continueSelling ? 1 : 0);
      // formData.append("check_id", options.checkId ? 1 : 0);
      // formData.append("check_dis", options.disable ? 1 : 0);
      // formData.append("check_food_stampable", options.foodStampable ? 1 : 0);
      // formData.append("inv_status", type ? 1 : 0);

      // console.log("data: ", data);
      // console.log("categoryId: ", categoryId);
      // console.log("type: ", type);
      // return;

      const response = await axios.post(
        BASE_URL + MASS_INVENTORY_UPDATE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        ToastifyAlert("Data Updated Successfully", "success");
        handleClose();
        setOptions({
          trackQuantity: false,
          continueSelling: false,
          checkId: false,
          disable: false,
          foodStampable: false,
        });
      }

      // console.log("response: ", response);
    } catch (e) {
      console.log("Error: ", e);
    } finally {
      setLoaders((prev) => ({
        ...prev,
        enable: false,
        disable: false,
      }));
    }
  };

  return (
    <>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Box
            className="view-category-item-modal mass-inventory-modal"
            style={myStyles}
          >
            <div class="cancel-btn">
              <img
                src={CloseIcon}
                className="cancel-image"
                onClick={() => handleClose()}
              />
            </div>
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
                      onCategoryChange={handleCategory}
                      listFor={"massInventoryUpdate"}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    className="category-checkmark-div"
                  >
                    <label className="category-checkmark-label">
                      Track Quantity
                      <input
                        type="checkbox"
                        checked={options.trackQuantity}
                        onChange={() => handleCheckbox("trackQuantity")}
                      />
                      <span className="category-checkmark"></span>
                    </label>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    className="category-checkmark-div"
                  >
                    <label className="category-checkmark-label">
                      Continue Selling
                      <input
                        type="checkbox"
                        checked={options.continueSelling}
                        onChange={() => handleCheckbox("continueSelling")}
                      />
                      <span className="category-checkmark"></span>
                    </label>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    className="category-checkmark-div"
                  >
                    <label className="category-checkmark-label">
                      Check ID
                      <input
                        type="checkbox"
                        checked={options.checkId}
                        onChange={() => handleCheckbox("checkId")}
                      />
                      <span className="category-checkmark"></span>
                    </label>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    className="category-checkmark-div"
                  >
                    <label className="category-checkmark-label">
                      Disable
                      <input
                        type="checkbox"
                        checked={options.disable}
                        onChange={() => handleCheckbox("disable")}
                      />
                      <span className="category-checkmark"></span>
                    </label>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    className="category-checkmark-div"
                  >
                    <label className="category-checkmark-label">
                      Food Stampable
                      <input
                        type="checkbox"
                        checked={options.foodStampable}
                        onChange={() => handleCheckbox("foodStampable")}
                      />
                      <span className="category-checkmark"></span>
                    </label>
                  </Grid>
                </Grid>
              </div>
            </div>

            <div className="q-add-categories-section-middle-footer">
              <button
                className="quic-btn quic-btn-save attributeUpdateBTN"
                onClick={() => handleSubmit("1")}
                disabled={loaders.enable || loaders.disable}
              >
                {loaders.enable && (
                  <CircularProgress
                    color={"inherit"}
                    className="loaderIcon"
                    width={15}
                    size={15}
                  />
                )}{" "}
                Enable
              </button>
              <button
                className="quic-btn quic-btn-cancle attributeUpdateBTN"
                onClick={() => handleSubmit("0")}
                disabled={loaders.enable || loaders.disable}
              >
                {loaders.disable && (
                  <CircularProgress
                    color={"inherit"}
                    className="loaderIcon"
                    width={15}
                    size={15}
                  />
                )}{" "}
                Disable
              </button>
            </div>
          </Box>
        </>
      </Modal>
    </>
  );
});

export default MassInventoryUpdateModal;
