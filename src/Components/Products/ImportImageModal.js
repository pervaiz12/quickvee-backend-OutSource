import React, { memo, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Box,
  CircularProgress,
  Divider,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";

import backIcon from "../../Assests/Taxes/Left.svg";
import CategoryListDropDown from "../../CommonComponents/CategoryListDropDown";
import axios from "axios";
import { BASE_URL, GET_RELATED_PRODUCT } from "../../Constants/Config";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";

import CloseIcon from "../../Assests/Dashboard/cross.svg";
import { Button } from "react-bootstrap";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
import Select from "react-select";
const myStyles = {
  width: "60%",
  position: "absolute",
  top: "47%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontFamily: "'CircularSTDMedium', sans-serif !important",
};
export default function ImportImageModal({ productTitle }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSuggestedProducts([]);
  };
  const [selectedStore, setSlectedStore] = React.useState("");
  const [selectedSuggestedProduct, setSelectedSuggestedProduct] =
    React.useState("");
  const [suggestedProducts, setSuggestedProducts] = React.useState([]);
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  let AuthDecryptDataDashBoardJSONFormat = LoginGetDashBoardRecordJson;

  const merchant_id = AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id;
  // console.log(JSON.parse(localStorage.getItem("AllStore")))
  const handleOptionClick = async (value) => {
    console.log("handleOptionClick", value);
    setSlectedStore(value.label);
    const data = {
      merchant_id: value.merchant_id,
      title: productTitle,
    };
    try {
      const res = await axios.post(BASE_URL + GET_RELATED_PRODUCT, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userTypeData?.token}`,
        },
      });
      if (res.data.status === true) {
        setSuggestedProducts(res.data.data);
      } else {
        setSuggestedProducts([]);
      }
      console.log(res.data.data);
    } catch (e) {}
  };
  return (
    <>
      <Button onClick={handleOpen}>Import Image</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="view-category-item-modal mass-inventory-modal"
          style={myStyles}
        >
          <div
            className="q-add-categories-section-header text-[18px]"
            style={{
              justifyContent: "space-between",
              fontFamily: "CircularSTDBook",
            }}
          >
            <span onClick={() => handleClose()}>
              <img src={backIcon} alt="Timesheet" className="w-6 h-6" />
              <span>{productTitle}</span>
            </span>
            <div class="cancel-btn">
              <img
                src={CloseIcon}
                className="cancel-image"
                onClick={() => handleClose()}
              />
            </div>
          </div>
          <Grid container sx={{ p: 2.5 }}>
            <Grid item xs={12}>
              <label>Product Status</label>
              <Select
                options={JSON.parse(localStorage.getItem("AllStore"))
                  .filter((item) => item.merchant_id !== merchant_id)
                  .map((item) => ({
                    value: item.id,
                    label: item.name,
                    merchant_id: item.merchant_id,
                  }))}
                onChange={handleOptionClick}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container sx={{px:2.5}}>
              {suggestedProducts.length > 0 &&
                suggestedProducts.map((product, index) => (
                  <>
                    <Grid item xs={4}>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value={product.title}
                          control={<Radio />}
                          label={product.title}
                        />
                      </RadioGroup>
                    <Divider orientation="vertical" flexItem />
                    </Grid>
                    {/* <p key={index}>{product.title}</p> */}
                  </>
                ))}
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ pb: 2.5, px: 2.5 }}
          >
            <Grid item>
              <div className="">
                <button
                  className="quic-btn quic-btn-save attributeUpdateBTN"
                  //   onClick={() => handleSubmit("1")}
                  //   disabled={loaders.enable || loaders.disable}
                >
                  {false && (
                    <CircularProgress
                      color={"inherit"}
                      className="loaderIcon"
                      width={15}
                      size={15}
                    />
                  )}{" "}
                  Import Image
                </button>
                <button
                  className="quic-btn quic-btn-cancle attributeUpdateBTN ms-8"
                  //   onClick={() => handleSubmit("0")}
                  //   disabled={loaders.enable || loaders.disable}
                >
                  {/* {false && (
                    <CircularProgress
                      color={"inherit"}
                      className="loaderIcon"
                      width={15}
                      size={15}
                    />
                  )}{" "} */}
                  Cancel
                </button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
