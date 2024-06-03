import React, { useState } from "react";
import TipReportList from "./TipReportList";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import { Grid } from "@mui/material";

const TipReportMain = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  return (
    <>
      <Grid container sx={{my: 3.7}}>
        <Grid item xs={12}>
          <DateRangeComponent onDateRangeChange={handleDateRangeChange} />
        </Grid>
      </Grid>

      <TipReportList
        selectedDateRange={selectedDateRange}
        // VendorIdData={VendorIdData}
      />
    </>
  );
};

export default TipReportMain;
