import React from "react";
import { Grid } from "@mui/material";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import Items_sales_profit_Logic from "./items_sales_profit_Logic";
import DashboardTables from "./Pagination/DashboardTables";

export default function Items_sales_profit_record() {
  const {
    onDateRangeChange,
    getItemRecord,
    getMessageRecord,
    loading,
    sortByItemName,
  } = Items_sales_profit_Logic();
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Grid
            container
            sx={{ padding: 2.5, mt: 3.6 }}
            className="box_shadow_div "
          >
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <h1 style={{ marginBottom: 0 }} className="heading ">
                  Product Profitability Report
                  </h1>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
                loading={loading}
                sortByItemName={sortByItemName}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
