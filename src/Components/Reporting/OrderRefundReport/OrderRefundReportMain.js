import React, { useState } from "react";
import OrderRefundFilter from "./OrderRefundFilter";

import OrderRefundReportList from "./OrderRefundReportList";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";

const OrderRefundReportMain = () => {
  // console.log(onCategoryChange)
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  // const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedReason, setSelectedReason] = useState("All");

  // const handleCategoryChange = (selectedCategoryId) => {
  //     setSelectedCategory(selectedCategoryId);
  // };

  const handleReasonChange = (selectedReason) => {
    setSelectedReason(selectedReason.title);
  };

  // console.log(selectedCategory)

  return (
    <>
      <OrderRefundFilter
        title={"Order Refund Report"}
        // onCategoryChange={handleCategoryChange}
        onReasonChange={handleReasonChange}
        selectedReason={selectedReason}
      />

      <DateRangeComponent onDateRangeChange={handleDateRangeChange} />

      <OrderRefundReportList
        selectedDateRange={selectedDateRange}
        // categoryId={selectedCategory}
        reasonTitle={selectedReason}
      />
    </>
  );
};

export default OrderRefundReportMain;
