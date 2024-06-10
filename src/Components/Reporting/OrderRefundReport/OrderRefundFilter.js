import React, { useState, useEffect } from "react";
import axios from "axios";
import DownIcon from "../../../Assests/Dashboard/Down.svg";
import { BASE_URL, ORDER_REFUND_REPORT } from "../../../Constants/Config";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { Grid } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";

const OrderRefundFilter = ({ title, onCategoryChange, onReasonChange,selectedReason }) => {
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const Categoryfilter = (event) => {
    const selectedCategoryId = event.target.value;
    // console.log(selectedCategoryId)
    onCategoryChange(selectedCategoryId);
  };

  const reasonfilter = (event) => {
    const selectedReason = event.target.value;
    // console.log(selectedReason)
    onReasonChange(selectedReason);
  };
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  const [categoryList, setCategoryList] = useState([]);
  console.log("categoryList",categoryList)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { token, ...newData } = userTypeData;
  //     let data = { merchant_id, ...newData };
  //     try {
  //       const response = await axios.post(
  //         BASE_URL + ORDER_REFUND_REPORT,
  //         data,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       // console.log(response.data['vendor_list']);

  //       setCategoryList(response.data["category_list"]);
  //     } catch (error) {
  //       console.error("Error fetching category list:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  const ReasonList = [
    "All",
    "Accidental Charge",
    "Cancelled Order",
    "Defective Item",
    "Fraudulent Order",
    "Returned Goods",
  ];
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container sx={{ padding: 2.5 }}>
            <Grid item xs={12}>
              <div className="q_details_header">Order Refund Report</div>
            </Grid>
          </Grid>
          <Grid container sx={{ px: 2.5 }}>
            <Grid item xs={12}>
              <div className="q_details_header ">Filter by</div>
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
