import React, { useState } from "react";

import DateRange from "../../../reuseableComponents/DateRangeComponent";
import DropCashReportList from "./DropCashReportList";
import { Grid } from "@mui/material";

const DropCashMain = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  return (
    <>
      <Grid
        container
        sx={{ padding: 2.5, mt: 3.6 }}
        className="box_shadow_div "
      >
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <h1 style={{ marginBottom: 0 }} className="heading ">
                Drop Cash Report
              </h1>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ my: 3.7 }}>
        <DateRange onDateRangeChange={handleDateRangeChange} />
      </Grid>

      <DropCashReportList selectedDateRange={selectedDateRange} />
    </>
  );
};

export default DropCashMain;
