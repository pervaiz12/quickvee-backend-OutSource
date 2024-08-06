import React from "react";
import SalesByHoursLogic from "./SalesByHoursLogic";
import { Grid } from "@mui/material";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import CustomHeader from "../../../reuseableComponents/CustomHeader";
import SalesByHoursReportTable from "./SalesByHoursReportTable";

export default function SalesByHourMain() {
  const {
    title,
    onDateRangeChange,
    SalesHoursData,
    rowHeader,
    TableLoader,
    sortByItemName,
    totalCost,
    advdayCount,
  } = SalesByHoursLogic();
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <CustomHeader>{title}</CustomHeader>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <DateRangeComponent
            onDateRangeChange={onDateRangeChange}
            future_date={advdayCount}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <SalesByHoursReportTable
            SalesHoursData={SalesHoursData}
            TableLoader={TableLoader}
            rowHeader={rowHeader}
            sortByItemName={sortByItemName}
            totalCost={totalCost}
          />
        </Grid>
      </Grid>
    </>
  );
}
