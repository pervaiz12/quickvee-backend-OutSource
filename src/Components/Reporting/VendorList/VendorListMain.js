import React, { useState } from "react";
// import FilterVendorList from '../VendorDetails/FilterVendorList'
// import DateRange from '../../Orders/InstoreOrder/DateRange';
import VendorReportList from "./VendorReportList";

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
      <VendorReportList
      // selectedDateRange={selectedDateRange}
      // VendorIdData={VendorIdData}
      />
    </>
  );
};

export default VendorListMain;
