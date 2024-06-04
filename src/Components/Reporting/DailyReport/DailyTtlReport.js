import React, { useState, useEffect } from "react";
import DateRange from "../../Orders/InstoreOrder/DateRange";
import DailyReportList from "./DailyReportList";
import DownIcon from "../../../Assests/Dashboard/Down.svg";
import { Grid } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import { useAuthDetails } from "../../../Common/cookiesHelper";
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
        // merchant_id: "MAL0100CA",
        order_env: orderEnvValue,
        order_typ: orderTypValue,
      };
      
      setFilteredData(updatedData);
    } else {
      // Handle other cases or log an error
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
  const orderSourceList = ["All", "Online Order", "Order Source"];
  const orderTypeList = ["All", "Pickup", "Delivery"];
  return (
    <>
      <Grid container sx={{ padding: 2.5 }} className="box_shadow_div ">
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <h1 className="heading">Daily Total Report</h1>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <h1 className="heading">Filter By</h1>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <label htmlFor="orderSourceFilter"> Order Source</label>
              <SelectDropDown
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
      {/* <div className="q-order-main-page">
        <div className="box">
          <div className="box_shadow_input">
            <div className="pd_20">
              <h1 className="heading">Daily Total Report</h1>

              <h1 className="heading">Filter By</h1>

              <div className="qvrow">
                <div
                  className={`Card_admin ${
                    isTablet ? "col-qv-12" : "col-qv-4"
                  }`}
                >
                  <label htmlFor="orderSourceFilter"> Order Source</label>
                  <div className="custom-dropdown input_area">
                    <div
                      className="custom-dropdown-header"
                      onClick={() => toggleDropdown("orderSource")}
                    >
                      <span className="selected-option mt-1">
                        {selectedOrderSource}
                      </span>
                      <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                    </div>
                    {orderSourceDropdownVisible && (
                      <div className="dropdown-content ">
                        <div
                          onClick={() =>
                            handleOptionClick("All", "orderSource")
                          }
                        >
                          All
                        </div>
                        <div
                          onClick={() =>
                            handleOptionClick("Online Order", "orderSource")
                          }
                        >
                          Online Order
                        </div>
                        <div
                          onClick={() =>
                            handleOptionClick("Store Order", "orderSource")
                          }
                        >
                          Order Source
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={`Card_admin ${
                    isTablet ? "col-qv-12" : "col-qv-4"
                  }`}
                >
                  <label> Order Type</label>
                  <div className="custom-dropdown input_area">
                    <div
                      className="custom-dropdown-header"
                      onClick={() => toggleDropdown("orderType")}
                    >
                      <span className="selected-option mt-1">
                        {selectedOrderType}
                      </span>
                      <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                    </div>
                    {orderTypeDropdownVisible && (
                      <div className="dropdown-content">
                        <div
                          onClick={() => handleOptionClick("All", "orderType")}
                        >
                          All
                        </div>
                        <div
                          onClick={() =>
                            handleOptionClick("Pickup", "orderType")
                          }
                        >
                          Pickup
                        </div>
                        <div
                          onClick={() =>
                            handleOptionClick("Delivery", "orderType")
                          }
                        >
                          Delivery
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <style>
        {`
          .dailytotoalReport .q_dateRange_header{
            margin-top: 0rem ;
          }
        `}
      </style>

      <div className="q-order-main-page">
        <div className="dailytotoalReport">
          <div className="box">
            <DateRange onDateRangeChange={handleDataFiltered} />
          </div>
        </div>
      </div> */}

      <div className="q-order-main-page">
        <DailyReportList data={filteredData} />
      </div>
    </>
  );
};

export default DailyTtlReport;
