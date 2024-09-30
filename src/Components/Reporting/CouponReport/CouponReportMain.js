import React, { useEffect, useState } from "react";

import DateRange from "../../../reuseableComponents/DateRangeComponent";
import CouponReportList from "./CouponReportList";
import { Grid } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { BASE_URL, GET_ALL_COUPON_RECORD } from "../../../Constants/Config";

import axios from "axios";

const CouponReportMain = ({ hide }) => {
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  let merchant_id = !!LoginGetDashBoardRecordJson?.data?.merchant_id
    ? LoginGetDashBoardRecordJson?.data?.merchant_id
    : "";
  const [selectedCoupon, setSelectedCoupon] = useState("All");

  const [CouponReportData, setCouponReportData] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [getCouponList, setGetCouponList] = useState([]);
  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
    getAllCouponList(dateRange);
  };

  const handleOptionClick = (option, dropdown) => {
    if (dropdown.toLowerCase() == "coupon") {
      if (option == "All") {
        setSelectedCoupon("All");
        // getAllCouponList();
      } else {
        // getAllCouponList();
        setSelectedCoupon(option?.name);
      }
    }
  };
  useEffect(() => {
    console.log("heloo main");
    getAllCouponList();
  }, [selectedCoupon]);

  const getAllCouponList = async (dateRange) => {
    let start_date = !!dateRange ? dateRange?.start_date : selectedDateRange;
    let end_date = dateRange?.end_date;
    let coupon_code = selectedCoupon;

    let data = {
      merchant_id,
      start_date: start_date,
      end_date: end_date,
      coupon_code,
      ...userTypeData,
    };
    const { token, ...newData } = data;
    const response = await axios.post(
      BASE_URL + GET_ALL_COUPON_RECORD,
      newData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response?.data?.status == true) {
      setGetCouponList(response?.data?.coupon_list);
    } else {
      setGetCouponList([]);
    }
  };

  return (
    <>
      {!hide && (
        <Grid
          container
          sx={{ padding: 2.5, mt: 3.6 }}
          className="box_shadow_div "
        >
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <h1 style={{ marginBottom: 0 }} className="heading ">
                  Coupon Report
                </h1>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      {/* --------------- */}
      <Grid
        container
        sx={{ padding: 2.5, mt: 3.6 }}
        className="box_shadow_div "
      >
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4}>
              <Grid item sx={{ py: 1 }} className="">
                <span className="heading">Filter By</span>
              </Grid>
              <label>Coupon name</label>
              <SelectDropDown
                heading={"All"}
                listItem={getCouponList}
                onClickHandler={handleOptionClick}
                selectedOption={selectedCoupon}
                dropdownFor={"coupon"}
                title={"name"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* --------------- */}

      <Grid container sx={{ my: 3.7 }}>
        <DateRange onDateRangeChange={handleDateRangeChange} />
      </Grid>

      <CouponReportList
        CouponReportData={CouponReportData}
        setCouponReportData={setCouponReportData}
        selectedDateRange={selectedDateRange}
        selectedCoupon={selectedCoupon}
      />
    </>
  );
};

export default CouponReportMain;
