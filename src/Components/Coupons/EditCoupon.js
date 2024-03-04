import React, { useState, useEffect, useCallback } from "react";
import AddNewCategory from "../../Assests/Dashboard/Left.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  BASE_URL,
  COUPON_DETAILS_ID_CHECK,
  COUPON_TITLE_CHECK, EDIT_COUPON
} from "../../Constants/Config";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import caleIcon from "../../Assests/Filter/Calender.svg";
import TimeIcon from "../../Assests/Filter/Clock.svg";
import dayjs, { Dayjs } from "dayjs";

import { useNavigate } from "react-router-dom";

import _ from "lodash";

const EditCoupon = () => {
  const myStyles = {
    display: "flex",
  };

  const handleCheckboxChange = (couponName) => (e) => {
    setCouponStates({
      ...couponStates,
      [couponName]: e.target.checked ? 1 : 0,
    });
  };

  const [activeTab, setActiveTab] = useState("");

  const params = useParams();
  async function fetchData() {
    const getcouponData = {
      merchant_id: "MAL0100CA",
      id: params.couponsCode,
    };

    try {
      const response = await axios.post(
        BASE_URL + COUPON_DETAILS_ID_CHECK,
        getcouponData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === true) {
        // console.log(response.data.result)
        return response.data.result;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchDataAndUpdateState = async () => {
      const res = await fetchData();

      if (res) {
        setCoupon({
          id: res[0].id,
          m_id: res[0].m_id,
          name: res[0].name,
          description: res[0].description,
          merchant_id: res[0].m_id,
          min_amount: res[0].min_amount,
          discount: res[0].discount,
          maximum_discount: res[0].maximum_discount,
          date_valid: res[0].date_valid,
          date_expire: res[0].date_expire,
          time_valid: res[0].time_valid,
          time_expire: res[0].time_expire,
          count_limit: res[0].count_limit,
          flag: res[0].flag,

        });

        setCouponStates({
          ...couponStates,
          online: res[0].show_online === "1" ? true : false,
          enablelimit: res[0].enable_limit === "1" ? true : false,
        });

        if (res[0].flag === "1") {
          setActiveTab("amount");
        } else {
          setActiveTab("percentage");
        }

        // setActiveTab(res[0].flag === 1 ? "percentage" : "amount");
      }
    };

    fetchDataAndUpdateState();
  }, [params.couponsCode]);

  const [inputValue, setInputValue] = useState("");
  const [isUnique, setIsUnique] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Function to check uniqueness in the database
  const checkUniqueness = async (value) => {
    const data = {
      merchant_id: "MAL0100CA",
      name: value,
    };
    try {
      const response = await axios.post(BASE_URL + COUPON_TITLE_CHECK, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data && response.data.status !== undefined) {
        setIsUnique(response.data.status); // Assuming the API returns { isUnique: boolean }
        setErrorMessage(
          response.data.status ? "" : "Coupon name already exists"
        );
      }
    } catch (error) {
      console.error("Error checking name uniqueness", error);
    }
  };

  // Debounce the checkUniqueness function
  const debouncedCheck = useCallback(_.debounce(checkUniqueness, 300), []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z0-9 ]*$/;

    if (regex.test(value) || value === "") {
      setInputValue(value);
      setIsUnique(true);
      setErrorMessage("");
      if (value) {
        debouncedCheck(value);
      }
    } else {
      setErrorMessage("Special characters are not allowed");
    }
  };

  const [coupon, setCoupon] = useState({
    id: "",
    m_id: "",
    name: "",
    description: "",
    merchant_id: "",
    min_amount: "",
    discount: "",
    maximum_discount: "",
    date_valid: "",
    date_expire: "",
    time_valid: "",
    time_expire: "",
    count_limit: "",
    flag: "",
  });

  const [couponStates, setCouponStates] = useState({
    online: coupon.show_online,
    enablelimit: coupon.enable_limit,
  });

  const handleShowOnlineChange = (e) => {
    const status = e.target.checked;
    setCouponStates({
      ...couponStates,
      online: status,
    });
  };

  const handleEnableLimitChange = (e) => {
    const status = e.target.checked;
    setCouponStates({
      ...couponStates,
      enablelimit: status,
    });
  };


  const navigate = useNavigate();

  const [minOrderAmountError, setMinOrderAmountError] = useState("");
  const [discountError, setDiscountError] = useState("");
  const [dateStartError, setDateStartError] = useState("");
  const [dateEndError, setDateEndError] = useState("");
  const [dateMaxDisAMTError, setDateMaxDisAMTError] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    // Create a new FormData object

    if (parseFloat(coupon.min_amount) <= parseFloat(coupon.discount)) {
      alert("Minimum order amount must be greater than the discount amount.");
      setCoupon({ ...coupon, discount: '' });
      setDiscountError("Discount Amount is required")
      return; // Stop further execution
    }
    if (!coupon.date_valid || !coupon.date_expire) {
      alert("Start date and end date are required.");
      return; // Stop further execution
    }
    if (!coupon.min_amount) {
      setMinOrderAmountError("Minimum Order Amount is required");
      return; // Stop further execution
    } else if (coupon.min_amount === "") {
      return;
    } else {
      setMinOrderAmountError("");
    }

    if (!coupon.discount) {
      setDiscountError("Discount Amount is required");
      return; // Stop further execution
    } else if (coupon.discount === "") {
      return
    } else {
      setDiscountError("");
    }

    if (!coupon.maximum_discount) {
      setDateMaxDisAMTError("Maximum Discount Amount is required");
      return; // Stop further execution
    } else if (coupon.maximum_discount === "") {
      setDateMaxDisAMTError("Maximum Discount Amount is required");
      return;
    } else {
      setDateMaxDisAMTError("");
    }


    if (!coupon.date_valid) {
      setDateStartError("Start Date is required");
      return;
    } else {
      setDateStartError("");
    }

    if (!coupon.date_expire) {
      setDateEndError("End Date is required");
      return;
    } else {
      setDateEndError("");
    }

    const formData = new FormData();

    // Append data to the formData object
    formData.append("coupon_id", coupon.id);
    formData.append("merchant_id", coupon.m_id);
    formData.append("coupon_code", inputValue || coupon.name);
    formData.append("description", coupon.description);
    formData.append("min_order_amount", coupon.min_amount);
    formData.append("discount", coupon.discount);
    formData.append("max_discount_amount", coupon.maximum_discount);
    formData.append("start_date", coupon.date_valid);
    formData.append("end_date", coupon.date_expire);
    formData.append("start_time", coupon.time_valid);
    formData.append("end_time", coupon.time_expire);
    formData.append("is_online", couponStates.online ? "1" : "0");
    formData.append("flag", activeTab === "percentage" ? "0" : "1");

    // Append count_limit only if enable_limit > 0
    if (couponStates.enablelimit === true) {
      formData.append(
        "enable_redemption_limit",
        couponStates.enablelimit ? "1" : "0"
      );
      if (coupon.count_limit === null || coupon.count_limit === "0") {
        coupon.count_limit = "1";
      }
      formData.append("redemption_limit", coupon.count_limit);
    }
    formData.append(
      "start_time",
      dayjs(coupon.time_valid, "HH:mm:ss").format("hh:mm A")
    );

    formData.append(
      "end_time",
      dayjs(coupon.time_expire, "HH:mm:ss").format("hh:mm A")
    );

    // Do something with formData, like sending it to an API endpoint
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const res = await axios.post(BASE_URL + EDIT_COUPON, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = await res.data.status;
      const update_message = await res.data.message;
      if (data === true) {
        // alert(update_message);
        let data = {
          merchant_id: "MAL0100CA",
        };
        navigate("/coupons");
      } else if (
        data == false &&
        update_message == "Coupon not updated, please try again."
      ) {
        setErrorMessage(update_message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };


  const handleStartTimeChange = (newTime) => {
    setCoupon({
      ...coupon,
      time_valid: newTime.format("HH:mm:ss"),
    });
  };
  const handleEndTimeChange = (newTime) => {
    setCoupon({
      ...coupon,
      time_expire: newTime.format("HH:mm:ss"),
    });
  };


  const handleStartDateChange = (newDate) => {
    const formattedStartDate = newDate.format("YYYY-MM-DD");
    if (formattedStartDate === coupon.date_expire) {
      alert("Start date cannot be the same as the end date");
      setCoupon({
        ...coupon,
        date_valid: "",
      });
    } else if (dayjs(formattedStartDate).isAfter(dayjs(coupon.date_expire))) {
      alert("Start date cannot be greater than the end date");
      setCoupon({
        ...coupon,
        date_valid: "",
      });
    } else {
      setCoupon({
        ...coupon,
        date_valid: formattedStartDate,
      });
    }
  };

  const handleEndDateChange = (newDate) => {
    const formattedEndDate = newDate.format("YYYY-MM-DD");

    if (formattedEndDate === coupon.date_valid) {
      alert("End date cannot be the same as the start date");
      setCoupon({
        ...coupon,
        date_expire: "",
      });
      return; // Do not update the state

    } else if (dayjs(formattedEndDate).isBefore(dayjs(coupon.date_valid))) {
      alert("End date cannot be less than the start date");
      setCoupon({
        ...coupon,
        date_expire: "",
      });
    } else {
      setCoupon({
        ...coupon,
        date_expire: formattedEndDate,
      });
    }
  };

  const handleMinAmountChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.trim() === '') {
      setMinOrderAmountError('Minimum Order Amount is required');
      setCoupon({ ...coupon, min_amount: '' });
    } else {
      setCoupon({ ...coupon, min_amount: inputValue });
      setMinOrderAmountError('');
    }
  };
  const handleDiscountAmountChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.trim() === '') {
      setDiscountError('Discount Amount is required');
      setCoupon({ ...coupon, discount: '' });
    } else {
      setCoupon({ ...coupon, discount: inputValue });
      setDiscountError('');
    }
  };
  const handleDiscountPercentChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.trim() === '') {
      setDiscountError('Discount Percentage is required');
      setCoupon({ ...coupon, discount: '' });
    } else {
      setCoupon({ ...coupon, discount: inputValue });
      setDiscountError('');
    }
  };

  const handleMaxDiscountChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.trim() === '') {
      setDateMaxDisAMTError('Maximum Discount Amount is required');
      setCoupon({ ...coupon, maximum_discount: '' });
    } else {
      setCoupon({ ...coupon, maximum_discount: inputValue });
      setDateMaxDisAMTError('');
    }
  };



  return (
    <>
      <div className="q-category-main-page">
        <div className="box ">
          <div className="box_shadow_div">
            <div className="q-add-categories-section">
              <div className="q-add-categories-section-header">
                <Link to={`/coupons`}>
                  <span style={myStyles}>
                    <img src={AddNewCategory} alt="Add-New-Category" />
                    <span className="pl-4">Edit Coupon</span>
                  </span>
                </Link>
              </div>
              <div className="q-add-categories-section-middle-form">

                <div className="q_coupon_Add_status_btn">
                  <p>show online</p>
                  <Switch
                    name="online"
                    id="online"
                    checked={couponStates.online === true}
                    onChange={handleShowOnlineChange}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#0A64F9",
                      },
                      "& .MuiSwitch-track": {
                        backgroundColor: "#0A64F9",
                      },
                    }}
                  />
                </div>
                <div className="q-add-coupon-single-input">
                  <label for="coupon_name">Coupon Code</label>
                  <input
                    type="text"
                    id="coupon_name"
                    name="coupon_name"
                    maxlength="11"
                    value={inputValue || coupon.name}
                    readOnly
                    onChange={handleInputChange}
                  />
                  {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                  )}
                </div>

                <div className="q-add-coupon-single-input">
                  <label for="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    cols="50"
                    value={coupon.description}
                    onChange={(e) =>
                      setCoupon({ ...coupon, description: e.target.value })
                    }
                  ></textarea>
                </div>

                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <div className="q_coupon_minium input_area">
                      <label for="minorder_amt">Minimum Order Amount</label>
                      <input
                        type="number"
                        id="minorder_amt"
                        name="minorder_amt"
                        value={coupon.min_amount}
                        onChange={(e) => handleMinAmountChange(e)}
                        required
                        placeholder="Enter Minimum Order Amount"
                      />
                      {minOrderAmountError && (
                        <p className="error-message">{minOrderAmountError}</p>
                      )}
                    </div>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <div className="q_coupon_minium  dicount_per_amo">
                      <Grid container>
                        <Grid item xs={6}>
                          {activeTab === "amount" && (
                            <div className="q_coupon_minium input_area">
                              <label for="discount_amt">Discount Amount</label>
                              <input
                                type="number"
                                id="discount_amt"
                                name="discount"
                                placeholder="Enter Discount Amount"
                                value={coupon.discount}
                                onChange={(e) => handleDiscountAmountChange(e)}
                              />
                              {discountError && (
                                <p className="error-message">{discountError}</p>
                              )}
                            </div>
                          )}
                          {activeTab === "percentage" && (
                            <div className="q_coupon_minium input_area">
                              <label for="discount_per">
                                Discount Percentage
                              </label>
                              <input
                                type="number"
                                id="discount_per"
                                name="discount"
                                placeholder="Enter Discount Percentage"
                                value={coupon.discount}

                                onChange={(e) => handleDiscountPercentChange(e)}
                              />
                              {discountError && (
                                <p className="error-message">{discountError}</p>
                              )}
                            </div>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <div className="AMT_PER_button">
                            <Grid container>
                              <Grid item xs={6}>
                                <div
                                  className={`cursor-pointer amt_btn text-center   ${activeTab === "amount"
                                    ? "bg-[#0A64F9] text-white radius-4"
                                    : ""
                                    }`}
                                >
                                  Amount ($)
                                </div>
                              </Grid>
                              <Grid item xs={6}>
                                <div
                                  className={`cursor-pointer amt_btn text-center  ${activeTab === "percentage"
                                    ? "bg-[#0A64F9] text-white radius-4"
                                    : ""
                                    }`}
                                >
                                  Percentage (%)
                                </div>
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
                {activeTab === "percentage" && (
                  <div className="q_coupon_minium input_area">
                    <label for="maximum_discount">
                      Maximum Discount Amount
                    </label>
                    <input
                      type="number"
                      id="maximum_discount"
                      name="maximum_discount"

                      placeholder="Enter Maximum Discount Amount"
                      value={coupon.maximum_discount}
                      onChange={(e) => handleMaxDiscountChange(e)}
                    />
                    {dateMaxDisAMTError && (
                      <p className="error-message">{dateMaxDisAMTError}</p>
                    )}
                  </div>
                )}

                <div className="q_coupon_minium my-4">
                  <label for="coupon">Date & Time</label>
                  <div className="flex flex-row gap-5">
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <div className="">
                          <div
                            style={{
                              display: "flex",
                              // gap: "1rem",
                              border: "1px solid #E3E3E3",
                              borderRadius: "4px",
                              height: "45px",
                            }}
                            className="date_selected"
                          >
                            <LocalizationProvider
                              dateAdapter={AdapterDayjs}
                              className="date-provider"
                            >
                              <DatePicker
                                label="Start date"
                                minDate={dayjs(new Date())}
                                value={dayjs(new Date(Date.parse(coupon.date_valid)))}
                                onChange={(newDate) => handleStartDateChange(newDate)}
                                shouldDisableDate={(date) => date.format("YYYY-MM-DD") === coupon.date_valid}
                                disablePast
                                views={['year', 'month', 'day']}
                                renderInput={() => (
                                  <input
                                    name="start_date"
                                    id="start_date"
                                    placeholder="Start Date"
                                  />
                                )}
                                components={{
                                  OpenPickerIcon: () => (
                                    <img src={caleIcon} alt="calendar-icon" />
                                  ),
                                }}
                              />


                            </LocalizationProvider>
                            {dateStartError && (
                              <p className="error-message">{dateStartError}</p>
                            )}
                            <div className="dividersss" />
                            <div className="q_time_display">
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                  label="Start Time"
                                  className="input_label_section"
                                  name="start_tym"
                                  id="start_tym"
                                  value={dayjs(coupon.time_valid, 'HH:mm:ss')}
                                  onChange={(newTime) => handleStartTimeChange(newTime)}
                                  components={{
                                    OpenPickerIcon: () => (
                                      <img src={TimeIcon} alt="time-icon" />
                                    ),
                                  }}
                                />
                              </LocalizationProvider>
                            </div>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="">
                          <div
                            style={{
                              display: "flex",
                              // gap: "1rem",
                              margin: "0px",
                              border: "1px solid #E3E3E3",
                              borderRadius: "4px",
                              height: "45px",
                            }}
                            className="date_selected"
                          >
                            <LocalizationProvider
                              dateAdapter={AdapterDayjs}
                              className="date-provider"
                            >
                              <DatePicker

                                label="End date"
                                minDate={dayjs(new Date())}
                                value={dayjs(new Date(Date.parse(coupon.date_expire)))}
                                onChange={(newDate) => handleEndDateChange(newDate)}
                                shouldDisableDate={(date) => date.format("YYYY-MM-DD") === coupon.date_expire}
                                disablePast
                                views={['year', 'month', 'day']}
                                renderInput={() => (
                                  <input
                                    name="end_date"
                                    id="end_date"
                                    className="date-picker-input"
                                  />
                                )}
                                components={{
                                  OpenPickerIcon: () => (
                                    <img src={caleIcon} alt="calendar-icon" />
                                  ),
                                }}
                              />
                              {dateEndError && (
                                <p className="error-message">{dateEndError}</p>
                              )}
                            </LocalizationProvider>
                            <div className="dividersss" />
                            <div className="q_time_display">
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                  label="End Time"
                                  className="input_label_section"
                                  name="end_tym"
                                  id="end_tym"
                                  value={dayjs(coupon.time_expire, 'HH:mm:ss')}
                                  onChange={(newTime) => handleEndTimeChange(newTime)}
                                  components={{
                                    OpenPickerIcon: () => (
                                      <img src={TimeIcon} alt="time-icon" />
                                    ),
                                  }}
                                />
                              </LocalizationProvider>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </div>

                <div className="q-add-coupon-single-input">
                  <div className="q_coupon_Add_status_btn">
                    <p>Enable Redemption Limit?</p>
                    <Switch
                      name="enable_limit"
                      id="enable_limit"
                      checked={couponStates.enablelimit === true}
                      onChange={handleEnableLimitChange}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#0A64F9", // Change color when switch is checked
                        },
                        "& .MuiSwitch-track": {
                          backgroundColor: "#0A64F9", // Change background color of the track
                        },
                      }}
                    />
                  </div>
                </div>

                {couponStates.enablelimit > 0 && (
                  <div className="q-add-coupon-single-input">
                    <label htmlFor="count_limit">Redemption Limit</label>
                    <input
                      type="number"
                      id="count_limit"
                      name="count_limit"
                      min={1}
                      max={999}
                      value={coupon.count_limit === null || coupon.count_limit === "0" ? 1 : Math.min(coupon.count_limit, 999)}
                      onChange={(e) =>
                        setCoupon({
                          ...coupon,
                          count_limit: Math.min(parseInt(e.target.value), 999),
                        })
                      }
                    />
                  </div>

                )}

                <div className="q-add-categories-section-middle-footer">
                  <button className="quic-btn quic-btn-save" onClick={handleSave}>Save</button>

                  <Link to={`/coupons`}>
                    <button className="quic-btn quic-btn-cancle">Cancel</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCoupon;