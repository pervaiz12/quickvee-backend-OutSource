import React, { useState } from "react";
import OrderRefundFilter from "./OrderRefundFilter";

import OrderRefundReportList from "./OrderRefundReportList";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import useDebounce from "../../../hooks/useDebouncs";

const OrderRefundReportMain = ({ hide, setCSVData, setCSVHeader }) => {
  const [searchRecord, setSearchRecord] = useState("");
  const debouncedValue = useDebounce(searchRecord);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [selectedEmployeeID, setSelectedEmployeeID] = useState("All");

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
        hide={hide}
        searchRecord={searchRecord}
        setSearchRecord={setSearchRecord}
        debouncedValue={debouncedValue}
        selectedEmployeeID={selectedEmployeeID}
        setSelectedEmployeeID={setSelectedEmployeeID}
      />

      <DateRangeComponent onDateRangeChange={handleDateRangeChange} />

      <OrderRefundReportList
        selectedDateRange={selectedDateRange}
        reasonTitle={selectedReason}
        debouncedValue={debouncedValue}
        selectedEmployeeID={selectedEmployeeID}
        setCSVData={setCSVData}
        setCSVHeader={setCSVHeader}
      />
    </>
  );
};

export default OrderRefundReportMain;
