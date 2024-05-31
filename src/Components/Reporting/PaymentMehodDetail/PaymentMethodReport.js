import React, { useState } from "react";
import DateRange from "../../Orders/InstoreOrder/DateRange";
import PaymentMethodList from "./PaymentMethodList";
import DownIcon from "../../../Assests/Dashboard/Down.svg";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { Grid } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";

const PaymentMethodReport = () => {
  const [filteredData, setFilteredData] = useState([]);
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  const handleDataFiltered = (data) => {
    if (typeof data === "object") {
      let orderEnvValue;

      switch (selectedOrderSource) {
        case "Online Order":
          orderEnvValue = 2;
          break;
        case "Store Order":
          orderEnvValue = 3;
          break;

        default:
          orderEnvValue = 2;
          break;
      }

      const updatedData = {
        ...data,
        merchant_id: merchant_id,
        order_env: orderEnvValue,
        ...userTypeData,
      };
      setFilteredData(updatedData);
    } else {
      // Handle other cases or log an error
      console.error("Invalid data format:", data);
    }
  };

  const [selectedOrderSource, setSelectedOrderSource] =
    useState("Online Order");

  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "orderSource":
        setSelectedOrderSource(option.title);

        break;

      default:
        break;
    }
  };
  const orderSourceList = ["Online Order", "Store Order"];
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container sx={{ padding: 2.5 }}>
            <Grid item xs={12}>
              <div className="q_details_header">
                {" "}
                Payment Method Daily Report
              </div>
            </Grid>
          </Grid>
          <Grid container sx={{ px: 2.5 }}>
            <Grid item xs={12}>
              <div className="q_details_header ">Filter by</div>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item xs={12}>
              <label
                className="q-details-page-label"
                htmlFor="orderSourceFilter"
              >
                Order Source
              </label>
              <SelectDropDown
                listItem={orderSourceList.map((item) => ({ title: item }))}
                title={"title"}
                dropdownFor={"orderSource"}
                selectedOption={selectedOrderSource}
                onClickHandler={handleOptionClick}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <DateRangeComponent onDateRangeChange={handleDataFiltered} />

      <PaymentMethodList data={filteredData} />
    </>
  );
};

export default PaymentMethodReport;
