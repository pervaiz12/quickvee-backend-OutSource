import React, { useState, useEffect, useRef } from "react";

import DownIcon from "../../../Assests/Dashboard/Down.svg";
import UpArrow from "../../../Assests/Dashboard/Up.svg";
import SearchBar from "../SearchBar";
import { Grid, TextField } from "@mui/material";
import InputTextSearch from "../../../reuseableComponents/InputTextSearch";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
const MainOnline = ({ onFilterDataChange }) => {
  const transactionsList = [
    {
      title: "Both",
    },
    {
      title: "Cash",
    },
    {
      title: "Online",
    },
  ];

  const orderStatusList = [
    {
      title: "New",
    },
    {
      title: "Closed",
    },
    {
      title: "Failed",
    },
  ];

  const [searchId, setSearchId] = useState("");
  const handleSearch = () => {
    console.log("Search ID:", searchId);
  };

  const [isTablet, setIsTablet] = useState(false);
  // const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [selectedTransaction, setSelectedTransaction] = useState("Both");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("New");

  // const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);
  const [transactionDropdownVisible, setTransactionDropdownVisible] =
    useState(false);
  const [orderStatusDropdownVisible, setOrderStatusDropdownVisible] =
    useState(false);

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      // case "employee":
      //   setEmployeeDropdownVisible(!employeeDropdownVisible);
      //   break;
      case "transaction":
        setTransactionDropdownVisible(!transactionDropdownVisible);
        break;
      case "orderStatus":
        setOrderStatusDropdownVisible(!orderStatusDropdownVisible);
        break;
      default:
        break;
    }
  };

  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "transaction":
        setSelectedTransaction(option.title);
        setTransactionDropdownVisible(false);
        break;
      case "orderStatus":
        setSelectedOrderStatus(option.title);
        setOrderStatusDropdownVisible(false);
        break;
      default:
        break;
    }
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTransactionDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const orderStatus = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (orderStatus.current && !orderStatus.current.contains(event.target)) {
        setOrderStatusDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    onFilterDataChange(selectedTransaction, selectedOrderStatus);
  }, [selectedTransaction, selectedOrderStatus]);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 885);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Grid container className="px-5">
        <Grid item xs={12}>
          <Grid container className="mt-5">
            <Grid item xs={12} className="">
              <InputTextSearch
                placeholder="Search orders by order ID, last 4 digits on payment card, or invoice ID"
                value={searchId}
                handleChange={setSearchId}
                handleSearchButton={handleSearch}
              />
            </Grid>
          </Grid>
          <Grid container className="mt-5 ">
            <Grid item className="mt_card_header q_dashbaord_netsales ">
              <h1 className="">Filter By</h1>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <label htmlFor="transactionFilter">Transactions</label>
              <SelectDropDown
                heading={""}
                listItem={transactionsList}
                onClickHandler={handleOptionClick}
                selectedOption={selectedTransaction}
                dropdownFor={"transaction"}
              />
            </Grid>
            <Grid item xs={4}>
              <label htmlFor="orderStatusFilter">Order Status</label>
              <SelectDropDown
                heading={""}
                listItem={orderStatusList}
                onClickHandler={handleOptionClick}
                selectedOption={selectedOrderStatus}
                dropdownFor={"orderStatus"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <div className="q_main_data_range">
        <div className="q_searchBar">
          <div className="flex border  rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search orders by order ID, last 4 digits on payment card, or invoice ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full px-4 py-2 border-none focus:outline-none place_text_search"
            />
          </div>
          <div className="mt_card_header q_dashbaord_netsales">
            <h1 className="">Filter By</h1>
          </div>

          <div className="qvrow">
            <div
              className={`Card_admin ${isTablet ? "col-qv-12" : "col-qv-4"}`}
            >
              <label
                htmlFor="transactionFilter"
                onClick={() =>
                  setTransactionDropdownVisible(!transactionDropdownVisible)
                }
              >
                Transactions
              </label>
              <div className="custom-dropdown input_area" ref={dropdownRef}>
                <div
                  className="custom-dropdown-header"
                  onClick={() => toggleDropdown("transaction")}
                >
                  <span className="selected-option mt-1">
                    {selectedTransaction}
                  </span>

                  <img
                    src={transactionDropdownVisible ? UpArrow : DownIcon}
                    alt="Dropdown Icon"
                    className="w-6 h-6"
                  />
                </div>
                {transactionDropdownVisible && (
                  <div className="dropdown-content">
                    <div
                      className={
                        selectedTransaction === "Both"
                          ? "dropdown-item active"
                          : "dropdown-item"
                      }
                      onClick={() => handleOptionClick("Both", "transaction")}
                    >
                      Both
                    </div>
                    <div
                      className={
                        selectedTransaction === "Cash"
                          ? "dropdown-item active"
                          : "dropdown-item"
                      }
                      onClick={() => handleOptionClick("Cash", "transaction")}
                    >
                      Cash
                    </div>
                    <div
                      className={
                        selectedTransaction === "Online"
                          ? "dropdown-item active"
                          : "dropdown-item"
                      }
                      onClick={() => handleOptionClick("Online", "transaction")}
                    >
                      Online
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              className={`Card_admin ${isTablet ? "col-qv-12" : "col-qv-4"}`}
            >
              <label
                htmlFor="orderStatusFilter"
                onClick={() =>
                  setOrderStatusDropdownVisible(!orderStatusDropdownVisible)
                }
              >
                Order Status
              </label>
              <div className="custom-dropdown input_area" ref={orderStatus}>
                <div
                  className="custom-dropdown-header"
                  onClick={() => toggleDropdown("orderStatus")}
                >
                  <span className="selected-option mt-1">
                    {selectedOrderStatus}
                  </span>
                  <img
                    src={orderStatusDropdownVisible ? UpArrow : DownIcon}
                    alt="Dropdown Icon"
                    className="w-6 h-6"
                  />
                </div>
                {orderStatusDropdownVisible && (
                  <div className="dropdown-content">
                    <div
                      className={
                        selectedOrderStatus === "New"
                          ? "dropdown-item active"
                          : "dropdown-item"
                      }
                      onClick={() => handleOptionClick("New", "orderStatus")}
                    >
                      New
                    </div>
                    <div
                      className={
                        selectedOrderStatus === "Closed"
                          ? "dropdown-item active"
                          : "dropdown-item"
                      }
                      onClick={() => handleOptionClick("Closed", "orderStatus")}
                    >
                      Closed
                    </div>
                    <div
                      className={
                        selectedOrderStatus === "Failed"
                          ? "dropdown-item active"
                          : "dropdown-item"
                      }
                      onClick={() => handleOptionClick("Failed", "orderStatus")}
                    >
                      Failed
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default MainOnline;
