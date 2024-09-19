import React, { useState } from "react";
import SiftSetting from "./SiftSetting";
import DateRange from "../../Orders/InstoreOrder/DateRange";
import SiftSummaryDetails from "./SiftSummaryDetails";

const MainSiftSummary = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [SelectEmpListData, setSelectEmpListData] = useState(null);

  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  const handleFilterDataChange = (SelectEmpList) => {
    setSelectEmpListData(SelectEmpList);
  };

  return (
    <>
      <div className="q-order-main-page">
        <SiftSetting onFilterDataChange={handleFilterDataChange} />
      </div>

      <div className="q-order-main-page">
        <div className="box">
          <DateRange onDateRangeChange={handleDateRangeChange} />
        </div>
      </div>

      <div className="q-order-main-page">
        <SiftSummaryDetails
          selectedDateRange={selectedDateRange}
          SelectEmpListData={SelectEmpListData}
        />
      </div>
    </>
  );
};

export default MainSiftSummary;
