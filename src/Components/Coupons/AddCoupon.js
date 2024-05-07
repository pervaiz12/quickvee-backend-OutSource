import React, { useState, useCallback } from "react";
import AddNewCategory from "../../Assests/Dashboard/Left.svg";
import CustomeDateTime from "./CustomeDateTime";
import axios from "axios";
import {
  BASE_URL,
  COUPON_TITLE_CHECK,
  ADD_COUPON,
} from "../../Constants/Config";
import _ from "lodash";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import caleIcon from "../../Assests/Filter/Calender.svg";
import TimeIcon from "../../Assests/Filter/Clock.svg";
import dayjs, { Dayjs } from "dayjs";
import BasicTextFields from "../../reuseableComponents/TextInputField";
const AddCoupon = ({ seVisible }) => {
  const [activeTab, setActiveTab] = useState("amount");

  const [couponStates, setCouponStates] = useState({
    online: false,
    enable_limit: false,
  });

  const handleCheckboxChange = (couponName) => (e) => {
    setCouponStates({
      ...couponStates,
      [couponName]: e.target.checked ? 1 : 0,
    });
  };

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
    let value = e.target.value;
    const regex = /^[A-Za-z0-9 ]*$/;

    if (regex.test(value) || value === "") {
      value = value.toUpperCase();
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setDateMaxDisAMTError("");
    setDiscountError("");
  };

  const minutes = Math.round(dayjs().minute() / 15) * 15;
  const roundedTime = dayjs().minute(minutes).second(0);
  console.log(roundedTime);

  const [coupon, setCoupon] = useState({
    merchant_id: "MAL0100CA",
    coupon_type: 0,
    is_online: "",
    coupon_code: "",
    description: "",
    min_order_amount: "",
    discount: "",
    flag: "",
    maximum_discount: "",
    date_valid: "",
    date_expire: "",
    time_valid: dayjs().format("HH:mm:ss"),
    time_expire: dayjs().format("HH:mm:ss"),

    // time_valid: roundedTime.format("HH:mm:ss"),
    // time_expire: roundedTime.format("HH:mm:ss"),
  });

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
        date_valid: null,
      });
      setDateStartError("Start Date is required");
    } else if (dayjs(formattedStartDate).isAfter(dayjs(coupon.date_expire))) {
      alert("Start date cannot be greater than the end date");
      setCoupon({
        ...coupon,
        date_valid: null,
      });
      setDateStartError("Start Date is required");
    } else {
      setCoupon({
        ...coupon,
        date_valid: formattedStartDate,
      });
      setDateStartError("");
    }
  };

  const handleEndDateChange = (newDate) => {
    const formattedEndDate = newDate.format("YYYY-MM-DD");

    if (formattedEndDate === coupon.date_valid) {
      alert("End date cannot be the same as the start date");
      setCoupon({
        ...coupon,
        date_expire: null,
      });
      setDateEndError("End Date is required");
      // return; // Do not update the state
    } else if (dayjs(formattedEndDate).isBefore(dayjs(coupon.date_valid))) {
      alert("End date cannot be less than the start date");
      setCoupon({
        ...coupon,
        date_expire: null,
      });
      setDateEndError("End Date is required");
    } else {
      setCoupon({
        ...coupon,
        date_expire: formattedEndDate,
      });
      setDateEndError("");
    }
  };

  const [minOrderAmountError, setMinOrderAmountError] = useState("");
  const [discountError, setDiscountError] = useState("");
  const [dateStartError, setDateStartError] = useState("");
  const [dateEndError, setDateEndError] = useState("");
  const [dateMaxDisAMTError, setDateMaxDisAMTError] = useState("");
  const [countLimitError, setCountLimitError] = useState("");

  const handleAddButtonClick = async (e) => {
    e.preventDefault();

    if (errorMessage === "Coupon name already exists") {
      // return;
    } else if (inputValue === "") {
      setErrorMessage("Coupon name is required");
      // return;
    } else {
      setErrorMessage("");
    }

    if (parseFloat(coupon.min_amount) <= parseFloat(coupon.discount)) {
      alert("Minimum order amount must be greater than the discount amount.");
      setDiscountError("Discount Amount is required");
      setCoupon({ ...coupon, discount: "" });
      return; // Stop further execution
    }

    if (!coupon.min_amount) {
      setMinOrderAmountError("Minimum Order Amount is required");
      // return; // Stop further execution
    } else if (coupon.min_amount === "") {
      // return;
    } else {
      setMinOrderAmountError("");
    }
    if (activeTab === "amount") {
      if (!coupon.discount) {
        setDiscountError("Discount Amount is required");
        // return; // Stop further execution
      } else if (coupon.discount === "") {
        // return;
      } else {
        setDiscountError("");
      }
    }

    if (activeTab === "percentage") {
      if (!coupon.maximum_discount) {
        setDateMaxDisAMTError("Maximum Discount Amount is required");

        // return; // Stop further execution
      } else if (coupon.maximum_discount === "") {
        setDateMaxDisAMTError("Maximum Discount Amount is required");
        // return;
      } else {
        setDateMaxDisAMTError("");
      }
      if (!coupon.discount == null || coupon.discount === "") {
        setDiscountError("Discount Amount Percentage is required");
      } else {
        setDiscountError("");
      }
    }

    if (!coupon.date_valid) {
      //  alert("Start Date are required.");
      setDateStartError("Start Date is required");
      // return; // Stop further execution
    }
    if (!coupon.date_expire) {
      // alert("End Date are required.");
      setDateEndError("End Date is required");
      // return; // Stop further execution
    }

    const formData = new FormData();
    formData.append("merchant_id", coupon.merchant_id);
    formData.append("coupon_type", coupon.coupon_type);
    formData.append("coupon_code", inputValue);
    formData.append("description", coupon.description);
    formData.append("min_order_amount", coupon.min_amount);
    formData.append("discount", coupon.discount);
    formData.append("start_date", coupon.date_valid);
    formData.append("end_date", coupon.date_expire);
    formData.append("is_online", couponStates.online ? "1" : "0");
    formData.append("flag", activeTab === "percentage" ? "0" : "1");
    if (activeTab === "percentage") {
      formData.append("max_discount_amount", coupon.maximum_discount);
    } else {
      formData.append("max_discount_amount", "0.00");
    }
    formData.append(
      "enable_redemption_limit",
      couponStates.enable_limit ? "1" : "0"
    );
    if (couponStates.enable_limit > 0) {
      if (!coupon.count_limit === "0") {
        setCountLimitError("Please enter a value greater than or equal to 1.");
        // return; // Stop further execution
      }
      formData.append(
        "enable_redemption_limit",
        couponStates.enable_limit ? "1" : "0"
      );

      if (!coupon.count_limit) {
        setCountLimitError("Redemption Limit is required");
        // return; // Stop further execution
      } else {
        setCountLimitError("");
      }

      if (coupon.count_limit === null || coupon.count_limit === "0") {
        setCountLimitError("Please enter a value greater than or equal to 1.");
        // return; // Stop further execution
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

    if (
      errorMessage === "Coupon name already exists" ||
      inputValue === "" ||
      minOrderAmountError === "Minimum Order Amount is required" ||
      discountError === "Discount Amount is required" ||
      discountError === "Discount Amount Percentage is required" ||
      dateStartError === "Start Date is required" ||
      dateEndError === "End Date is required" ||
      dateMaxDisAMTError === "Maximum Discount Amount is required"
    ) {
      return;
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

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const res = await axios.post(BASE_URL + ADD_COUPON, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = await res.data.status;
      const update_message = await res.data.message;
      if (data === true) {
        // alert(update_message);
        let data = {
          merchant_id: "MAL0100CA",
        };
        seVisible("CouponDiscount");
      } else if (
        data == false &&
        update_message === "Coupon not added, please try again."
      ) {
        setErrorMessage(update_message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleMinAmountChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.trim() === "") {
      setMinOrderAmountError("Minimum Order Amount is required");
      setCoupon({ ...coupon, min_amount: "" });
    } else {
      setCoupon({ ...coupon, min_amount: inputValue });
      setMinOrderAmountError("");
    }
  };

  const handleDiscountAmountChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.trim() === "") {
      setDiscountError("Discount Amount is required");
      setCoupon({ ...coupon, discount: "" });
    } else {
      setCoupon({ ...coupon, discount: inputValue });
      setDiscountError("");
    }
  };
  const handleDiscountPercentChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.trim() === "") {
      setDiscountError("Discount Percentage is required");
      setCoupon({ ...coupon, discount: "" });
    } else {
      setCoupon({ ...coupon, discount: inputValue });
      setDiscountError("");
    }
  };

  const handleMaxDiscountChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.trim() === "") {
      setDateMaxDisAMTError("Maximum Discount Amount is required");
      setCoupon({ ...coupon, maximum_discount: "" });
    } else {
      setCoupon({ ...coupon, maximum_discount: inputValue });
      setDateMaxDisAMTError("");
    }
  };

  return (
    <>
      <div className="box">
        <div className="box_shadow_div">
          <div className="q-add-categories-section">
            <div className="q-add-categories-section-header">
              <span
                onClick={() => seVisible("CouponDiscount")}
                className="add_coupon_span"
              >
                <img
                  src={AddNewCategory}
                  alt="Add-New-Category"
                  className="h-9 w-9"
                />
                <span>Add Coupons</span>
              </span>
            </div>
            <form onSubmit={handleAddButtonClick}>
              <div className="q-add-categories-section-middle-form">
                <div className="q_coupon_Add_status_btn">
                  <p>Show Online</p>
                  <Switch
                    name="online"
                    id="online"
                    checked={couponStates.online}
                    onChange={handleCheckboxChange("online")}
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

                <div className="q-add-coupon-single-input mb-5">
                  <label htmlFor="coupon_name">Coupon Code</label>
                  <BasicTextFields
                    type={"text"}
                    value={inputValue}
                    maxLength={11}
                    onChangeFun={handleInputChange}
                  />
                  {/* <input
                    type="text"
                    id="coupon_name"
                    name="coupon_name"
                    maxLength="11"
                    value={inputValue}
                    onChange={handleInputChange}
                  /> */}
                  {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                  )}
                </div>

                <div className="q-add-coupon-single-input mb-5">
                  <label htmlFor="description">Description</label>
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
                      <label htmlFor="minorder_amt">Minimum Order Amount</label>
                      <BasicTextFields
                        type={"number"}
                        value={coupon.min_amount}
                        onChangeFun={handleMinAmountChange}
                        placeholder="Enter Minimum Order Amount"
                      />
                      {/* <input
                        type="number"
                        id="minorder_amt"
                        name="minorder_amt"
                        value={coupon.min_amount}
                        onChange={(e) => handleMinAmountChange(e)}
                        placeholder="Enter Minimum Order Amount"
                      /> */}
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
                              <label htmlFor="discount_amt">
                                Discount Amount
                              </label>
                              <BasicTextFields
                                type={"number"}
                                value={coupon.discount}
                                placeholder="Enter Discount Amount"
                                onChangeFun={handleDiscountAmountChange}
                              />
                              {/* <input
                                type="number"
                                id="discount_amt"
                                name="discount"
                                placeholder="Enter Discount Amount"
                                value={coupon.discount}
                                onChange={(e) => handleDiscountAmountChange(e)}
                              /> */}
                              {discountError && (
                                <p className="error-message">{discountError}</p>
                              )}
                            </div>
                          )}
                          {activeTab === "percentage" && (
                            <div className="q_coupon_minium input_area">
                              <label htmlFor="discount_per">
                                Discount Percentage
                              </label>
                              <BasicTextFields
                                type={"number"}
                                value={coupon.discount}
                                placeholder="Enter Discount Percentage"
                                onChangeFun={handleDiscountPercentChange}
                              />
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
                                  className={`cursor-pointer amt_btn text-center   ${
                                    activeTab === "amount"
                                      ? "bg-[#0A64F9] text-white radius-4"
                                      : ""
                                  }`}
                                  onClick={() => handleTabChange("amount")}
                                >
                                  Amount ($)
                                </div>
                              </Grid>
                              <Grid item xs={6}>
                                <div
                                  className={`cursor-pointer amt_btn text-center  ${
                                    activeTab === "percentage"
                                      ? "bg-[#0A64F9] text-white radius-4"
                                      : ""
                                  }`}
                                  onClick={() => handleTabChange("percentage")}
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
                    <label htmlFor="maximum_discount">
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
                  <label htmlFor="coupon mt-2">Date & Time</label>
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
                                onChange={(newDate) =>
                                  handleStartDateChange(newDate)
                                }
                                size="medium"
                                shouldDisableDate={(date) =>
                                  date.format("YYYY-MM-DD") ===
                                  coupon.date_valid
                                }
                                format={"DD-MM-YYYY"}
                                disablePast
                                views={["year", "month", "day"]}
                                slotProps={{
                                  textField: { placeholder: "Start Date" },
                                }}
                                components={{
                                  OpenPickerIcon: () => (
                                    <img src={caleIcon} alt="calendar-icon" />
                                  ),
                                }}
                                className="custom-datepicker"
                              />
                            </LocalizationProvider>
                            {dateStartError && (
                              <p className="error-message date_error">
                                {dateStartError}
                              </p>
                            )}
                            <div className="dividersss" />
                            <div className="q_time_display">
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                  className="input_label_section"
                                  name="start_tym"
                                  id="start_tym"
                                  value={dayjs(coupon.time_valid, "HH:mm:ss")}
                                  onChange={(newTime) =>
                                    handleStartTimeChange(newTime)
                                  }
                                  slotProps={{
                                    textField: { placeholder: "Start Time" },
                                  }}
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
                                onChange={(newDate) =>
                                  handleEndDateChange(newDate)
                                }
                                shouldDisableDate={(date) =>
                                  date.format("YYYY-MM-DD") ===
                                  coupon.date_expire
                                }
                                format={"DD-MM-YYYY"}
                                disablePast
                                views={["year", "month", "day"]}
                                slotProps={{
                                  textField: { placeholder: "End Date" },
                                }}
                                components={{
                                  OpenPickerIcon: () => (
                                    <img src={caleIcon} alt="calendar-icon" />
                                  ),
                                }}
                              />
                              {dateEndError && (
                                <p className="error-message date_error">
                                  {dateEndError}
                                </p>
                              )}
                            </LocalizationProvider>
                            <div className="dividersss" />
                            <div className="q_time_display">
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                  className="input_label_section"
                                  name="end_tym"
                                  id="end_tym"
                                  value={dayjs(coupon.time_expire, "HH:mm:ss")}
                                  onChange={(newTime) =>
                                    handleEndTimeChange(newTime)
                                  }
                                  slotProps={{
                                    textField: { placeholder: "End Time" },
                                  }}
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
                      checked={couponStates.enable_limit}
                      onChange={handleCheckboxChange("enable_limit")}
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

                {couponStates.enable_limit > 0 && (
                  <div className="q-add-coupon-single-input">
                    <label htmlFor="count_limit">Redemption Limit</label>
                    <input
                      type="number"
                      id="count_limit"
                      name="count_limit"
                      min="1"
                      max="999"
                      value={coupon.count_limit}
                      onChange={(e) =>
                        setCoupon({
                          ...coupon,
                          count_limit: e.target.value,
                        })
                      }
                    />

                    {countLimitError && (
                      <p className="error-message">{countLimitError}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="q-add-categories-section-middle-footer">
                <button className="quic-btn quic-btn-save">Add</button>
                <button
                  onClick={() => seVisible("CouponDiscount")}
                  className="quic-btn quic-btn-cancle"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCoupon;
