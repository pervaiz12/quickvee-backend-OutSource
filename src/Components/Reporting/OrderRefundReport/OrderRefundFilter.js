import React, { useState, useEffect } from "react";



import { useAuthDetails } from "../../../Common/cookiesHelper";
import { Grid } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import CustomHeader from "../../../reuseableComponents/CustomHeader";

const OrderRefundFilter = ({
  title,
  onCategoryChange,
  onReasonChange,
  selectedReason,
}) => {
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const Categoryfilter = (event) => {
    const selectedCategoryId = event.target.value;
    
    onCategoryChange(selectedCategoryId);
  };

  const reasonfilter = (event) => {
    const selectedReason = event.target.value;
    
    onReasonChange(selectedReason);
  };
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  const [categoryList, setCategoryList] = useState([]);
  console.log("categoryList", categoryList);

  
  const ReasonList = [
    "All",
    "Accidental Charge",
    "Cancelled Order",
    "Defective Item",
    "Fraudulent Order",
    "Returned Goods",
    "Out of Stock",
    "Other",
  ];
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <CustomHeader>Order Refund Report</CustomHeader>

          <Grid container sx={{ px: 2.5,pt:1 }}>
            <Grid item xs={12}>
              <div className="heading">Filter By</div>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item xs={12} sm={6} md={4}>
              <label
                className="q-details-page-label"
                htmlFor="orderSourceFilter"
              >
                Select Reason
              </label>
              <SelectDropDown
                listItem={ReasonList.map((item) => ({ title: item }))}
                title={"title"}
                selectedOption={selectedReason}
                onClickHandler={onReasonChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderRefundFilter;
