import React, { useState } from "react";
import FilterVendorList from "../VendorDetails/FilterVendorList";
import VendorSalesReportList from "./VendorSalesReportList";
import DateRangeComponent from '../../../reuseableComponents/DateRangeComponent';

const VendorSalesReportMain = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  const [VendorIdData, setVendorIdData] = useState(null);

  const handleFilterDataChange = (option) => {
    if(option == "All") {
      setVendorIdData("all")
    }else{
      setVendorIdData(option.id)
    }

    
  };

  return (
    <>
      <FilterVendorList
        title={"Vendor Payout Report"}
        onVendorChange={handleFilterDataChange}
      />

      <div className="q-attributes-main-page">
        <div className="box">
          <DateRangeComponent onDateRangeChange={handleDateRangeChange} />
        </div>
      </div>
    
          <VendorSalesReportList
            selectedDateRange={selectedDateRange}
            VendorIdData={VendorIdData}
          />
        
    </>
  );
};

export default VendorSalesReportMain;
