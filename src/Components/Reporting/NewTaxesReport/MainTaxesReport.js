import React, { useState } from "react";


import TaxesDetails from "./TaxesDetails";

import { useAuthDetails } from "../../../Common/cookiesHelper";
import { Grid } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import CustomHeader from "../../../reuseableComponents/CustomHeader";

const MainTaxesReport = () => {
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const [filteredData, setFilteredData] = useState("");
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  const handleDataFiltered = (data) => {
    if (typeof data === "object") {
      let orderEnvValue;
      let orderTypValue;
      let taxTypValue;

      switch (selectedOrderSource) {
        case "All":
          orderEnvValue = 9;
          break;
        case "Online Order":
          orderEnvValue = 5;
          break;
        case "Store Order":
          orderEnvValue = 6;
          break;
        // Add more cases if needed

        default:
          orderEnvValue = 9;
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

      switch (selectedTaxesType) {
        case "Tax Report":
            taxTypValue = "Tax Report";
          break;
        case "Tax Report 2":
            taxTypValue = "Tax Report 2";
          break;
        default:
          taxTypValue = "Tax Report ";
          break;
      }
      const updatedData = {
        ...data,
        merchant_id,
        order_env: orderEnvValue,
        order_typ: orderTypValue,
        // taxes_type: taxTypValue,
        ...userTypeData,
      };
      setFilteredData(updatedData);
    } else {
      // Handle other cases or log an error
      console.error("Invalid data format:", data);
    }
  };

  const [selectedOrderSource, setSelectedOrderSource] = useState("All");
  const [selectedOrderType, setSelectedOrderType] = useState("All");
  const [selectedTaxesType, setSelectedTaxesType] = useState("Tax Report");




  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "orderSource":
        setSelectedOrderSource(option.title);

        break;
      case "orderType":
        setSelectedOrderType(option.title);

        break;
    case "TaxesType":
        setSelectedTaxesType(option.title);
            break;
    }
  };
  const orderSourceList = ["All", "Online Order", "Store Order"];
  const orderTypeList = ["All", "Pickup", "Delivery"];
  const TaxesTypeList = ["Tax Report", "Tax Report 2"];
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <CustomHeader>New Taxes Report</CustomHeader>

          <Grid container sx={{ px: 2.5,py:1 }}>
            <Grid item xs={12}>
              <div className="heading">Filter by</div>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item xs={12} sm={6} md={4}>
              <label className="q-details-page-label" htmlFor="employeeFilter">
                 Report Type
              </label>
              <SelectDropDown
                listItem={TaxesTypeList.map((item) => ({ title: item }))}
                title="title"
                dropdownFor="TaxesType"
                selectedOption={selectedTaxesType}
                onClickHandler={handleOptionClick}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6} md={4}>
              <label className="q-details-page-label" htmlFor="employeeFilter">
                Order Source
              </label>
              <SelectDropDown
                listItem={orderSourceList.map((item) => ({ title: item }))}
                title="title"
                dropdownFor="orderSource"
                selectedOption={selectedOrderSource}
                onClickHandler={handleOptionClick}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label className="q-details-page-label" htmlFor="orderTypeFilter">
                Order Type
              </label>
              <SelectDropDown
                listItem={orderTypeList.map((item) => ({ title: item }))}
                title="title"
                dropdownFor="orderType"
                selectedOption={selectedOrderType}
                onClickHandler={handleOptionClick}
              />
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>

      <DateRangeComponent onDateRangeChange={handleDataFiltered} />

      <TaxesDetails data={filteredData} />
    </>
  );
};

export default MainTaxesReport;
