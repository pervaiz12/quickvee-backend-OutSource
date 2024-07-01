import React, { useState } from "react";
// import FilterVendorList from '../VendorDetails/FilterVendorList'
// import DateRange from '../../Orders/InstoreOrder/DateRange';
import VendorReportList from "./VendorReportList";
import { Grid } from "@mui/material";

const VendorListMain = () => {
  // const [selectedDateRange, setSelectedDateRange] = useState(null);
  // const handleDateRangeChange = (dateRange) => {
  //     setSelectedDateRange(dateRange);
  // };

  // const [VendorIdData, setVendorIdData] = useState(null);

  // const handleFilterDataChange = (VendorId) => {
  //     setVendorIdData(VendorId);
  // };

  return (
    <>
    {/* <Grid container sx={{ padding: 2.5,mt:3.6 }} className="box_shadow_div ">
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <h1 style={{marginBottom:0}} className="heading ">Vendors List Report</h1>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
      <VendorReportList
      // selectedDateRange={selectedDateRange}
      // VendorIdData={VendorIdData}
      />
    </>
  );
};

export default VendorListMain;
