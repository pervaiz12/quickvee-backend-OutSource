import React, { useState } from "react";
import SalesReportList from "./SalesReportList";
import Grid from "@mui/system/Unstable_Grid/Grid";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";

const SalesReportMain = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const onDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  return (
    <>
      <Grid container sx={{ padding: 2.5,mt:3.6 }} className="box_shadow_div ">
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <h1 style={{marginBottom:0}} className="heading ">Sales Summary</h1>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ paddingY: 3.7 }}>
        <Grid item xs={12}>
          <DateRangeComponent onDateRangeChange={onDateRangeChange} />
        </Grid>
      </Grid>

      <div className="q-attributes-main-page">
        <SalesReportList
          selectedDateRange={selectedDateRange}
          
        />
      </div>
    </>
  );
};

export default SalesReportMain;
