import React, { useState } from "react";
import SalesbyTable from "./SalesbyTable";
import BarCharts from "../../../Dashboard/BarCharts";
import { Grid } from "@mui/material";
import DashDateRangeComponent from "../../../../reuseableComponents/DashDateRangeComponent";
import DateRangeComponent from "../../../../reuseableComponents/DateRangeComponent";

function SalebyHourMain({ hide }) {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const onDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };
  return (
    <>
      <Grid container sx={{ my: 2.5 }}>
        {hide ? (
          <DashDateRangeComponent onDateRangeChange={onDateRangeChange} />
        ) : (
          ""
        )}
      </Grid>
      <BarCharts />
      <SalesbyTable />
    </>
  );
}

export default SalebyHourMain;
