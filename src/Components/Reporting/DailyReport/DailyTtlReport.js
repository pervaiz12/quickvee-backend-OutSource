import React, { useState, useEffect } from "react";

import DailyReportList from "./DailyReportList";

import { Grid } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import CustomHeader from "../../../reuseableComponents/CustomHeader";
const DailyTtlReport = () => {
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const [filteredData, setFilteredData] = useState([]);
  const [isTablet, setIsTablet] = useState(false);

  const handleDataFiltered = (data) => {
    if (typeof data === "object") {
      let orderEnvValue;
      let orderTypValue;

      switch (selectedOrderSource) {
        case "All":
          orderEnvValue = 1;
          break;
        case "Online Order":
          orderEnvValue = 2;
          break;
        case "Store Order":
          orderEnvValue = 3;
          break;
        // Add more cases if needed

        default:
          orderEnvValue = 1;
          break;
      }
      switch (selectedOrderType) {
        case "All":
          orderTypValue = "both";
          break;
        case "Pickup":
          orderTypValue = "pickup";
          break;
        case "Delivery":
          orderTypValue = "delivery";
          break;
        default:
          orderTypValue = "both";
          break;
      }
      const updatedData = {
        ...data,
        
        order_env: orderEnvValue,
        order_typ: orderTypValue,
      };

      setFilteredData(updatedData);
    } else {
      
      console.error("Invalid data format:", data);
    }
  };

  const [selectedOrderSource, setSelectedOrderSource] = useState("All");
  const [selectedOrderType, setSelectedOrderType] = useState("All");

  const [orderSourceDropdownVisible, setOrderSourceDropdownVisible] =
    useState(false);
  const [orderTypeDropdownVisible, setOrderTypeDropdownVisible] =
    useState(false);

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "orderSource":
        setOrderSourceDropdownVisible(!orderSourceDropdownVisible);
        break;
      case "orderType":
        setOrderTypeDropdownVisible(!orderTypeDropdownVisible);
        break;

      default:
        break;
    }
  };

  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "orderSource":
        setSelectedOrderSource(option.title);
        setOrderSourceDropdownVisible(false);
        break;
      case "orderType":
        setSelectedOrderType(option.title);
        setOrderTypeDropdownVisible(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 995);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const orderSourceList = ["All", "Online Order", "Store Order"];
  const orderTypeList = ["All", "Pickup", "Delivery"];
  return (
    <>
      <Grid container sx={{ pb: 2.5 }} className="box_shadow_div ">
        <Grid item xs={12}>
          <CustomHeader>Daily Total Report</CustomHeader>

          <Grid container sx={{px:2.5,pt:1}}>
            <Grid item xs={12}>
              <h1 className="heading">Filter By</h1>
            </Grid>
          </Grid>
          <Grid container sx={{ px: 2.5 }} spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <label htmlFor="orderSourceFilter">Order Source</label>
              <SelectDropDown
                sx={{ pt: 0.5 }}
                listItem={orderSourceList.map((orderSource) => ({
                  title: orderSource,
                }))}
                title="title"
                onClickHandler={handleOptionClick}
                dropdownFor="orderSource"
                selectedOption={selectedOrderSource}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label> Order Type</label>
              <SelectDropDown
                sx={{ pt: 0.5 }}
                listItem={orderTypeList.map((orderSource) => ({
                  title: orderSource,
                }))}
                title="title"
                onClickHandler={handleOptionClick}
                dropdownFor="orderType"
                selectedOption={selectedOrderType}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12}>
          <DateRangeComponent onDateRangeChange={handleDataFiltered} />
        </Grid>
      </Grid>

      <div className="q-order-main-page">
        <DailyReportList data={filteredData} />
      </div>
    </>
  );
};

export default DailyTtlReport;
