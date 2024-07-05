import React, { useState, useEffect, useRef } from "react";
import { Grid, TextField } from "@mui/material";
import InputTextSearch from "../../../reuseableComponents/InputTextSearch";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
const MainOnline = ({ onFilterDataChange, searchId, setSearchId,order_env }) => {
  const transactionsList = [
    {
      title: "Both",
    },
    {
      title: "Cash Payment",
    },
    {
      title: "Card Payment",
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

  // console.log("setSearchId", searchId);
  const handleSearch = () => {
    // console.log("Search ID:", searchId);
  };

  const [isTablet, setIsTablet] = useState(false);
  // const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [selectedTransaction, setSelectedTransaction] = useState("Both");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(
    order_env ? "Closed" : "New"
  );
  
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
    onFilterDataChange(selectedTransaction, selectedOrderStatus, searchId);
  }, [selectedTransaction, selectedOrderStatus, searchId]);

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
          {!searchId && (
            <>
              <Grid container className="mt-5 ">
                <Grid item className="mt_card_header q_dashbaord_netsales ">
                  <h1 className="">Filter By</h1>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <label htmlFor="transactionFilter">Transactions</label>
                  <SelectDropDown
                    heading={""}
                    listItem={transactionsList}
                    title={"title"}
                    onClickHandler={handleOptionClick}
                    selectedOption={selectedTransaction}
                    dropdownFor={"transaction"}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <label htmlFor="orderStatusFilter">Order Status</label>
                  <SelectDropDown
                    heading={""}
                    listItem={orderStatusList}
                    title={"title"}
                    onClickHandler={handleOptionClick}
                    selectedOption={selectedOrderStatus}
                    dropdownFor={"orderStatus"}
                  />
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default MainOnline;
