import React, { useState } from "react";
import OrderRefundFilter from "./OrderRefundFilter";

import OrderRefundReportList from "./OrderRefundReportList";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";

const OrderRefundReportMain = () => {
  
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  
  const [selectedReason, setSelectedReason] = useState("All");

  



  const handleReasonChange = (selectedReason) => {
    setSelectedReason(selectedReason.title);
  };



  return (
    <>
      <OrderRefundFilter
        title={"Order Refund Report"}
    
        onReasonChange={handleReasonChange}
        selectedReason={selectedReason}
      />

      <DateRangeComponent onDateRangeChange={handleDateRangeChange} />

      <OrderRefundReportList
        selectedDateRange={selectedDateRange}
        
        reasonTitle={selectedReason}
      />
    </>
  );
};

export default OrderRefundReportMain;
