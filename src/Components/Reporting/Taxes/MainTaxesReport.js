import React, { useState } from "react";
import DateRange from "../../Orders/InstoreOrder/DateRange";
import TaxesFilter from "./TaxesFilter";
import TaxesDetails from "./TaxesDetails";
import DownIcon from "../../../Assests/Dashboard/Down.svg";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { Grid } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";

const MainTaxesReport = () => {
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const [filteredData, setFilteredData] = useState('');
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  const handleDataFiltered = (data) => {
    if (typeof data === "object") {
      let orderEnvValue;
      let orderTypValue;

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
      const updatedData = {
        ...data,
        merchant_id,
        order_env: orderEnvValue,
        order_typ: orderTypValue,
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

  const [orderSourceVisible, setOrderSourdeDropdownVisible] = useState(false);
  const [orderTypeVisible, setOrderTypeDropdownVisible] = useState(false);

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "orderSource":
        setOrderSourdeDropdownVisible(!orderSourceVisible);
        break;
      case "ordertype":
        setOrderTypeDropdownVisible(!orderTypeVisible);
        break;
    }
  };
  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "orderSource":
        setSelectedOrderSource(option.title);
        setOrderSourdeDropdownVisible(false);
        break;
      case "orderType":
        setSelectedOrderType(option.title);
        setOrderTypeDropdownVisible(false);
        break;
    }
  };
  const orderSourceList = ["All", "Online Order", "Store Order"];
  const orderTypeList = ["All", "Pickup", "Delivery"];
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container sx={{ padding: 2.5 }}>
            <Grid item xs={12}>
              <div className="q_details_header">Taxes</div>
            </Grid>
          </Grid>
          <Grid container sx={{ px: 2.5 }}>
            <Grid item xs={12}>
              <div className="q_details_header ">Filter by</div>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item xs={12} sm={6} md={4}>
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <DateRangeComponent onDateRangeChange={handleDataFiltered} />

      <TaxesDetails data={filteredData} />
    </>
  );
};

export default MainTaxesReport;
