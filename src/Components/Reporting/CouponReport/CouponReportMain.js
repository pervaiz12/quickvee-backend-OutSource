import React, { useState } from "react";
// import DateRange from "../../Orders/InstoreOrder/DateRange";
import DateRange from "../../../reuseableComponents/DateRangeComponent";
import CouponReportList from "./CouponReportList";
import { Grid } from "@mui/material";

const CouponReportMain = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  return (
    <>
      <Grid container sx={{my: 3.7}}>
        <DateRange onDateRangeChange={handleDateRangeChange} />
      </Grid>

      <CouponReportList
        selectedDateRange={selectedDateRange}
        // VendorIdData={VendorIdData}
      />
    </>
  );
};

export default CouponReportMain;
