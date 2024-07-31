import React from "react";
import SalesByHoursLogic from "./SalesByHoursLogic";
import { Grid } from "@mui/material";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import CustomHeader from "../../../reuseableComponents/CustomHeader";

export default function SalesByHourMain() {
  const { title, onDateRangeChange } = SalesByHoursLogic();
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <CustomHeader>{title}</CustomHeader>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <DateRangeComponent onDateRangeChange={onDateRangeChange} />
        </Grid>
      </Grid>
    </>
  );
}
