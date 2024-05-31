import React, { useState, useEffect, useRef } from "react";
import { Container, Row } from "react-bootstrap";

import DownIcon from "../../Assests/Dashboard/Down.svg";
import CheckIcon from "../../../src/Assests/Filter/Check.svg";
import UpArrow from "../../../src/Assests/Dashboard/Up.svg";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormControl, Grid } from "@mui/material";
const Welcome = ({ isOpen, onClose, children }) => {
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState("All");
  const [transactionDropdownVisible, setTransactionDropdownVisible] =
    useState(false);

  const dataCalender = useRef(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setVisibleCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // useEffect(() => {
  //   const handleOutsideClick = (event) => {
  //     if (dataCalender.current && !dataCalender.current.contains(event.target)) {
  //       setVisibleCalendar(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleOutsideClick);

  //   return () => {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, []);
  const openCalendar = () => {
    if (!visibleCalendar) {
      setVisibleCalendar(true);
    }
  };

  const closeCalendar = () => {
    if (visibleCalendar) {
      setVisibleCalendar(() => false);
    }
  };

  const toggleDropdown = (dropdownType) => {
    if (dropdownType === "transaction") {
      setTransactionDropdownVisible((prevVisible) => !prevVisible);
    }
  };

  const handleOptionClick = (option, dropdownType) => {
    if (dropdownType === "transaction") {
      setSelectedTransaction(option);
      setTransactionDropdownVisible(false);
    }
  };

  const [daysFilter, setDaysFilter] = useState("today");

  const handleClick = (tab) => {
    setDaysFilter(tab);
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const handleStartDateIconClick = () => {
    startDateRef.current.setOpen(true);
  };

  const handleEndDateIconClick = () => {
    endDateRef.current.setOpen(true);
  };

  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const handleDateChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  const handleRetrieve = () => {
    alert("Retrieve button clicked");
  };
  const daysList = [
    {
      title: "Today",
    },
    {
      title: "Yesterday",
    },
    {
      title: "Week to Date",
    },
    {
      title: "Last Week",
    },
    {
      title: "Last 7 days",
    },
    {
      title: "Month To Date",
    },
    {
      title: "This Month",
    },
    {
      title: "This Year",
    },
  ];
  return (
    <>
      <div className="box" ref={dropdownRef}>
        <div className="flex justify-between mb-10 mt-12 ">
          <div className="q_dashboard_welcom_msg">
            <h1>Welcome Malik Saleh</h1>
          </div>
          <div
            onClick={openCalendar}
            className={`q_dashboard_welcom_msg cursor-pointer ${
              visibleCalendar ? "active" : ""
            }`}
            // Assigning the ref to the wrapper div
          >
            {/* <h1>Oct 4, 2023 - Oct 4, 2023</h1> */}
            <div className="container">
              <div className="row">
                <div className="col-qv-12">
                  <div
                    className={
                      visibleCalendar ? "dataCalender" : "nonedatacalender"
                    }
                    ref={dataCalender}
                  >
                    <Grid container>
                      <Grid item xs={12} className="">
                        <Grid container spacing={2}>
                          <Grid item xs={5.5}>
                            <Grid container>
                              <Grid className="my-0 q-details-page-label_dasbaord py-1">
                                Select Option
                              </Grid>
                            </Grid>
                            <Grid container>
                              <Grid item xs={12} className="">
                                <ul className="flex space-x-4 mb-4">
                                  <li
                                    className={`select_date_btn ${
                                      daysFilter === "today" ? "active" : ""
                                    }`}
                                    style={{
                                      borderColor:
                                        daysFilter === "today" ? "#0A64F9" : "",
                                      color:
                                        daysFilter === "today"
                                          ? "#0A64F9"
                                          : "#707070",
                                      boxShadow:
                                        daysFilter === "today" ? "" : "",
                                    }}
                                    onClick={() => handleClick("today")}
                                  >
                                    <a href="#" className="days_filter">
                                      Today
                                      {daysFilter === "today" && (
                                        <>
                                          <img
                                            src={CheckIcon}
                                            alt="Checkmark"
                                            className=""
                                          />
                                        </>
                                      )}
                                    </a>
                                  </li>
                                  <li
                                    className={`select_date_btn ${
                                      daysFilter === "yesterday" ? "active" : ""
                                    }`}
                                    style={{
                                      borderColor:
                                        daysFilter === "yesterday"
                                          ? "#0A64F9"
                                          : "",
                                      color:
                                        daysFilter === "yesterday"
                                          ? "#0A64F9"
                                          : "",
                                      boxShadow:
                                        daysFilter === "yesterday" ? "" : "",
                                    }}
                                    onClick={() => handleClick("yesterday")}
                                  >
                                    <a href="#" className="days_filter">
                                      Yesterday
                                      {daysFilter === "yesterday" && (
                                        <img
                                          src={CheckIcon}
                                          alt="Checkmark"
                                          className=""
                                        />
                                      )}
                                    </a>
                                  </li>
                                </ul>
                                {/* weeks days details */}
                                <ul className="flex space-x-4 mb-4">
                                  <li
                                    className={`select_date_btn ${
                                      daysFilter === "week_days" ? "active" : ""
                                    }`}
                                    style={{
                                      borderColor:
                                        daysFilter === "week_days"
                                          ? "#0A64F9"
                                          : "",
                                      color:
                                        daysFilter === "week_days"
                                          ? "#0A64F9"
                                          : "",
                                      boxShadow:
                                        daysFilter === "week_days" ? "" : "",
                                    }}
                                    onClick={() => handleClick("week_days")}
                                  >
                                    <a href="#" className="days_filter">
                                      Week to Date
                                      {daysFilter === "week_days" && (
                                        <img
                                          src={CheckIcon}
                                          alt="Checkmark"
                                          className=""
                                        />
                                      )}
                                    </a>
                                  </li>
                                  <li
                                    className={`select_date_btn ${
                                      daysFilter === "Last days" ? "active" : ""
                                    }`}
                                    style={{
                                      borderColor:
                                        daysFilter === "Last days"
                                          ? "#0A64F9"
                                          : "",
                                      color:
                                        daysFilter === "Last days"
                                          ? "#0A64F9"
                                          : "",
                                      boxShadow:
                                        daysFilter === "Last days" ? "" : "",
                                    }}
                                    onClick={() => handleClick("Last days")}
                                  >
                                    <a href="#" className="days_filter">
                                      Last Week
                                      {daysFilter === "Last days" && (
                                        <img
                                          src={CheckIcon}
                                          alt="Checkmark"
                                          className=""
                                        />
                                      )}
                                    </a>
                                  </li>
                                </ul>

                                <ul className="flex space-x-4 mb-4">
                                  <li
                                    className={`select_date_btn ${
                                      daysFilter === "Last Month"
                                        ? "active"
                                        : ""
                                    }`}
                                    style={{
                                      borderColor:
                                        daysFilter === "Las7days"
                                          ? "#0A64F9"
                                          : "",
                                      color:
                                        daysFilter === "Las7days"
                                          ? "#0A64F9"
                                          : "",
                                      boxShadow:
                                        daysFilter === "Las7days" ? "" : "",
                                    }}
                                    onClick={() => handleClick("Las7days")}
                                  >
                                    <a href="#" className="days_filter">
                                      Last 7 days
                                      {daysFilter === "Las7days" && (
                                        <img
                                          src={CheckIcon}
                                          alt="Checkmark"
                                          className=""
                                        />
                                      )}
                                    </a>
                                  </li>
                                  <li
                                    className={`select_date_btn ${
                                      daysFilter === "Mont_date" ? "active" : ""
                                    }`}
                                    style={{
                                      borderColor:
                                        daysFilter === "Mont_date"
                                          ? "#0A64F9"
                                          : "",
                                      color:
                                        daysFilter === "Mont_date"
                                          ? "#0A64F9"
                                          : "",
                                      boxShadow:
                                        daysFilter === "Mont_date" ? "" : "",
                                    }}
                                    onClick={() => handleClick("Mont_date")}
                                  >
                                    <a href="#" className="days_filter">
                                      Month To Date
                                      {daysFilter === "Mont_date" && (
                                        <img
                                          src={CheckIcon}
                                          alt="Checkmark"
                                          className=""
                                        />
                                      )}
                                    </a>
                                  </li>
                                </ul>
                                <ul className="flex space-x-4 mb-4">
                                  <li
                                    className={`select_date_btn ${
                                      daysFilter === "This Month"
                                        ? "active"
                                        : ""
                                    }`}
                                    style={{
                                      borderColor:
                                        daysFilter === "This Month"
                                          ? "#0A64F9"
                                          : "",
                                      color:
                                        daysFilter === "This Month"
                                          ? "#0A64F9"
                                          : "",
                                      boxShadow:
                                        daysFilter === "This Month" ? "" : "",
                                    }}
                                    onClick={() => handleClick("This Month")}
                                  >
                                    <a href="#" className="days_filter">
                                      This Month
                                      {daysFilter === "This Month" && (
                                        <img
                                          src={CheckIcon}
                                          alt="Checkmark"
                                          className=""
                                        />
                                      )}
                                    </a>
                                  </li>
                                  <li
                                    className={`select_date_btn ${
                                      daysFilter === "This Year" ? "active" : ""
                                    }`}
                                    style={{
                                      borderColor:
                                        daysFilter === "This Year"
                                          ? "#0A64F9"
                                          : "",
                                      color:
                                        daysFilter === "This Year"
                                          ? "#0A64F9"
                                          : "",
                                      boxShadow:
                                        daysFilter === "This Year" ? "" : "",
                                    }}
                                    onClick={() => handleClick("This Year")}
                                  >
                                    <a href="#" className="days_filter">
                                      This Year
                                      {daysFilter === "This Year" && (
                                        <img
                                          src={CheckIcon}
                                          alt="Checkmark"
                                          className=""
                                        />
                                      )}
                                    </a>
                                  </li>
                                </ul>
                              </Grid>
                            </Grid>
                            <Grid container>
                              <Grid
                                item
                                xs={12}
                                className="mt-20"
                                ref={dropdownRef}
                              >
                                <label
                                  className="q-details-page-label_dasbaord"
                                  htmlFor="transactionFilter"
                                  onClick={() =>
                                    setTransactionDropdownVisible(
                                      !transactionDropdownVisible
                                    )
                                  }
                                >
                                  Compare to
                                </label>
                                <div className="container">
                                  <div className="row">
                                    <div className="col-12">
                                      <div
                                        className="custom-dropdown-header"
                                        onClick={() =>
                                          toggleDropdown("transaction")
                                        }
                                      >
                                        <span className="selected-option mt-1">
                                          {selectedTransaction}
                                        </span>
                                        <img
                                          src={
                                            transactionDropdownVisible
                                              ? UpArrow
                                              : DownIcon
                                          }
                                          alt="Dropdown Icon"
                                          className="w-8 h-8"
                                        />
                                      </div>
                                      <div
                                        className="custom-dropdown input_area"
                                        ref={dataCalender}
                                      >
                                        {transactionDropdownVisible && (
                                          <div className="dropdown-content">
                                            <div
                                              className={
                                                selectedTransaction === "All"
                                                  ? "dropdown-item active"
                                                  : "dropdown-item"
                                              }
                                              onClick={() =>
                                                handleOptionClick(
                                                  "All",
                                                  "transaction"
                                                )
                                              }
                                            >
                                              All
                                            </div>
                                            <div
                                              className={
                                                selectedTransaction ===
                                                "last Wednesday"
                                                  ? "dropdown-item active"
                                                  : "dropdown-item"
                                              }
                                              onClick={() =>
                                                handleOptionClick(
                                                  "last Wednesday",
                                                  "transaction"
                                                )
                                              }
                                            >
                                              Last Wednesday
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid
                            item
                            style={{ marginTop: "25px" }}
                            xs={0.1}
                            className="border-r border-[#ccc] px-1 mt-12 h-[415px]"
                          ></Grid>
                          <Grid item xs={6}>
                            <Grid container>
                              <Grid item xs={12}>
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DateCalendar />
                                </LocalizationProvider>
                              </Grid>
                            </Grid>
                            <Grid container className="" spacing={2}>
                              <Grid className="mx-3" item xs={6}>
                                <FormControl fullWidth>
                                  <label className="q-details-page-label_dasbaord">
                                    Start Date
                                  </label>
                                  <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    dateFormat="MMMM d, yyyy"
                                    className="select_date_btn"
                                    ref={startDateRef}
                                    showPopperArrow={false}
                                  />
                                  <span
                                    className="cursor-pointer"
                                    onClick={handleStartDateIconClick}
                                  ></span>
                                </FormControl>
                              </Grid>
                              <Grid item xs={6}>
                                <FormControl fullWidth>
                                  <div className="q-details-page-label_dasbaord">
                                    End Date
                                  </div>
                                  <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    dateFormat="MMMM d, yyyy"
                                    className="select_date_btn"
                                    ref={endDateRef}
                                    showPopperArrow={false}
                                  />
                                  <span
                                    className="cursor-pointer"
                                    onClick={handleEndDateIconClick}
                                  ></span>
                                </FormControl>
                              </Grid>
                            </Grid>

                            <Grid
                              container
                              spacing={2}
                              style={{ marginTop: "15px" }}
                            >
                              <Grid
                                item
                                xs={6}
                                className="date_cal_selector mt-6"
                              >
                                <button
                                  className="btn-dashboard-section-cncl"
                                  onClick={closeCalendar}
                                >
                                  Cancel
                                </button>
                              </Grid>
                              <Grid item xs={6} className="date_cal_selector">
                                <button
                                  className="btn-dashboard-section-save"
                                  onClick={handleRetrieve}
                                >
                                  Retrieve
                                </button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* <div className="container">
                    <div className="row">
                      <div className="flex justify-between gap-0">
                        <div className="col-6">
                          <div
                            className="q-add-categories-section-middle-footer flex justify-between "

                          >
                            <button
                              className="filter_btn quic-btn-cancle "
                              onClick={closeCalendar}
                            >
                              Cancel
                            </button>

                          </div>
                        </div>
                        <div className="col-6">
                          <div className="q-add-categories-section-middle-footer flex justify-between">
                            <button
                              className="filter_btn quic-btn-save"
                              onClick={handleRetrieve}
                            >
                              Retrieve
                            </button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>    */}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
