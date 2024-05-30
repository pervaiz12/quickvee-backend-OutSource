import React from "react";
import { Grid } from "@mui/material";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import Items_sales_profit_Logic from "./items_sales_profit_Logic";
import DashboardTables from "./Pagination/DashboardTables";

export default function Items_sales_profit_record() {
  const { onDateRangeChange, getItemRecord, getMessageRecord } =
    Items_sales_profit_Logic();
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <DateRangeComponent onDateRangeChange={onDateRangeChange} />
            </Grid>
          </Grid>
          <Grid container sx={{ marginY: 3.8 }}>
            <Grid item xs={12}>
              <DashboardTables
                getItemRecord={getItemRecord}
                getMessageRecord={getMessageRecord}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
