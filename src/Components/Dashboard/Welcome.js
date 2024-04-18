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
const Welcome = ({ isOpen, onClose, children }) => {
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState("All");
  const [transactionDropdownVisible, setTransactionDropdownVisible] =
    useState(false);

  // const calendarRef = useRef(null);

 
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (calendarRef.current && !calendarRef.current.contains(event.target)) {
  //       onClose();
  //       console.log("Clicked outside the div");
  //     } else {
  //       console.log("Clicked inside the div");
  //     }
  //   };

  //   if (isOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isOpen, onClose]);


  const openCalendar = () => {
    setVisibleCalendar(true);
  };

  const closeCalendar = () => {
    setVisibleCalendar(false);
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

  return (
    <>
     
      <div className="box">
        <div className="flex justify-between mb-10 mt-12 ">
          <div className="q_dashboard_welcom_msg">
            <h1>Welcome Malik Saleh</h1>
          </div>
          <div
            onClick={() => setVisibleCalendar((prevState) => !prevState)}
            className={`q_dashboard_welcom_msg ${visibleCalendar ? "active" : ""
              }`}
          >
            <h1>Oct 4, 2023 - Oct 4, 2023</h1>
          </div>

          <div
            className={visibleCalendar ? "dataCalender" : "nonedatacalender"}
          >
            <div className="flex mx-auto">
              <div className="w-full border-r border-gray-400 p-4">
                <div className="my-8 q-details-page-label ">Select Option</div>
                <div>
                  <ul className="flex space-x-8 mb-4">
                    <li
                      className={`select_date_btn ${daysFilter === "today" ? "active" : ""
                        }`}
                      style={{
                        borderColor: daysFilter === "today" ? "#0A64F9" : "",
                        color: daysFilter === "today" ? "#0A64F9" : "",
                        boxShadow: daysFilter === "today" ? "" : "",
                      }}
                      onClick={() => handleClick("today")}
                    >
                      <a href="#" className="days_filter">
                        Today
                        {daysFilter === "today" && (
                          <img src={CheckIcon} alt="Checkmark" className="" />
                        )}
                      </a>
                    </li>
                    <li
                      className={`select_date_btn ${daysFilter === "yesterday" ? "active" : ""
                        }`}
                      style={{
                        borderColor:
                          daysFilter === "yesterday" ? "#0A64F9" : "",
                        color: daysFilter === "yesterday" ? "#0A64F9" : "",
                        boxShadow: daysFilter === "yesterday" ? "" : "",
                      }}
                      onClick={() => handleClick("yesterday")}
                    >
                      <a href="#" className="days_filter">
                        Yesterday
                        {daysFilter === "yesterday" && (
                          <img src={CheckIcon} alt="Checkmark" className="" />
                        )}
                      </a>
                    </li>
                  </ul>
                  {/* weeks days details */}
                  <ul className="flex space-x-8 mb-4">
                    <li
                      className={`select_date_btn ${daysFilter === "week_days" ? "active" : ""
                        }`}
                      style={{
                        borderColor:
                          daysFilter === "week_days" ? "#0A64F9" : "",
                        color: daysFilter === "week_days" ? "#0A64F9" : "",
                        boxShadow: daysFilter === "week_days" ? "" : "",
                      }}
                      onClick={() => handleClick("week_days")}
                    >
                      <a href="#" className="days_filter">
                        Week to Date
                        {daysFilter === "week_days" && (
                          <img src={CheckIcon} alt="Checkmark" className="" />
                        )}
                      </a>
                    </li>
                    <li
                      className={`select_date_btn ${daysFilter === "Last days" ? "active" : ""
                        }`}
                      style={{
                        borderColor:
                          daysFilter === "Last days" ? "#0A64F9" : "",
                        color: daysFilter === "Last days" ? "#0A64F9" : "",
                        boxShadow: daysFilter === "Last days" ? "" : "",
                      }}
                      onClick={() => handleClick("Last days")}
                    >
                      <a href="#" className="days_filter">
                        Last Week
                        {daysFilter === "Last days" && (
                          <img src={CheckIcon} alt="Checkmark" className="" />
                        )}
                      </a>
                    </li>
                  </ul>
                  {/* week to date */}

                  {/* week to  month */}

                  <ul className="flex space-x-8 mb-4">
                    <li
                      className={`select_date_btn ${daysFilter === "Last Month" ? "active" : ""
                        }`}
                      style={{
                        borderColor: daysFilter === "Las7days" ? "#0A64F9" : "",
                        color: daysFilter === "Las7days" ? "#0A64F9" : "",
                        boxShadow: daysFilter === "Las7days" ? "" : "",
                      }}
                      onClick={() => handleClick("Las7days")}
                    >
                      <a href="#" className="days_filter">
                        Last 7 days
                        {daysFilter === "Las7days" && (
                          <img src={CheckIcon} alt="Checkmark" className="" />
                        )}
                      </a>
                    </li>
                    <li
                      className={`select_date_btn ${daysFilter === "Mont_date" ? "active" : ""
                        }`}
                      style={{
                        borderColor:
                          daysFilter === "Mont_date" ? "#0A64F9" : "",
                        color: daysFilter === "Mont_date" ? "#0A64F9" : "",
                        boxShadow: daysFilter === "Mont_date" ? "" : "",
                      }}
                      onClick={() => handleClick("Mont_date")}
                    >
                      <a href="#" className="days_filter">
                        Month To Date
                        {daysFilter === "Mont_date" && (
                          <img src={CheckIcon} alt="Checkmark" className="" />
                        )}
                      </a>
                    </li>
                  </ul>

                  <div className="mt-20 mb-3">
                    <div className="q-order-page-filter">
                      <label
                        className="q-details-page-label"
                        htmlFor="transactionFilter"
                      >
                        compare to
                      </label>
                      <div className="custom-dropdown">
                        <div
                          className="custom-dropdown-header"
                          onClick={() => toggleDropdown("transaction")}
                        >
                          <span className="selected-option mt-1">
                            {selectedTransaction}
                          </span>
                          <img
                            src={
                              transactionDropdownVisible ? UpArrow : DownIcon
                            }
                            alt="Dropdown Icon"
                            className="w-8 h-8"
                          />
                          {/* <img
                            src={DownIcon}
                            alt="Down Icon"
                            className="w-8 h-8"
                          />
                          <img src={UpArrow} alt="" className="w-8 h-8" /> */}
                        </div>
                        {transactionDropdownVisible && (
                          <div className="dropdown-content">
                            <div
                              onClick={() =>
                                handleOptionClick("All", "transaction")
                              }
                            >
                              All
                            </div>
                            <div
                              onClick={() =>
                                handleOptionClick(
                                  "last Wednesday",
                                  "transaction",
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
              </div>

              <div className="w-full p-4 md:w-full sm:w-full">
                {/* <div className="">
                  <Calendar
                    closeMOdal={closeMOdal}
                    visibleCalendar={visibleCalendar}
                  />
                </div> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar />
                </LocalizationProvider>

                <div className="flex justify-between w-full gap-2">
                  <div className="relative">
                    <div className="mb-2 text-[#818181]  Admin_std">Start Date</div>
                    <div className="lg:w-full sm:w-full md:h-full">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="MMMM d, yyyy"
                        className="q_input_details"
                        ref={startDateRef}
                        showPopperArrow={false}
                      />
                      <span
                        className="absolute right-3 top-14 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                        onClick={handleStartDateIconClick}
                      >
                        {/* <FiCalendar className="text-black" /> */}
                      </span>
                    </div>
                  </div>
                  <div className="relative mt-4 sm:mt-0">
                    <div className="mb-2 text-[#818181] Admin_std">End Date</div>
                    <div className="lg:w-full sm:w-full md:h-full">
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        dateFormat="MMMM d, yyyy"
                        className="q_input_details ml-0 md:ml-6"
                        ref={endDateRef}
                        showPopperArrow={false}
                      />
                    </div>
                    <span
                      className="absolute right-3 top-14 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                      onClick={handleEndDateIconClick}
                    >
                      {/* <FiCalendar className="text-black " /> */}
                    </span>
                  </div>
                </div>
                <div
                  className="q-add-categories-section-middle-footer"
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <button className="quic-btn quic-btn-cancle " onClick={closeCalendar}>
                    Cancel
                  </button>
                  <button className="quic-btn quic-btn-save" onClick={handleRetrieve}>
                    Retrieve
                  </button>
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
