import React, { useState } from "react";

import DateRange from "../../../reuseableComponents/DateRangeComponent";
import PayInList from "./PayInList";
import { Grid } from "@mui/material";

const PayInMain = () => {
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
                Pay In Report
              </h1>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ my: 3.7 }}>
        <DateRange onDateRangeChange={handleDateRangeChange} />
      </Grid>

      <PayInList selectedDateRange={selectedDateRange} />
    </>
  );
};

export default PayInMain;
