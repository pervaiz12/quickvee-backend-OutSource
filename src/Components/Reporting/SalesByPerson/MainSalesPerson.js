import React, { useState } from "react";
import SalesPersonFilter from "./SalesPersonFilter";
import SalesPersonReport from "./SalesPersonReport";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";

const MainSalesPerson = ({hide}) => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [OrderSourceData, setOrderSourceData] = useState(null);
  const [OrderTypeData, setOrderTypeData] = useState(null);
  const [SelectEmpListData, setSelectEmpListData] = useState(null);

  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  const handleFilterDataChange = (OrderSource, OrderType, SelectEmpList) => {
    setOrderSourceData(OrderSource);
    setOrderTypeData(OrderType);
    setSelectEmpListData(SelectEmpList);
  };
  return (
    <>
      <div className="q-order-main-page">
        <SalesPersonFilter onFilterDataChange={handleFilterDataChange} hide={hide} />
      </div>

      <div className="q-order-main-page">
        <div className="box">
          <DateRangeComponent onDateRangeChange={handleDateRangeChange} />
        </div>
      </div>

      <SalesPersonReport
        selectedDateRange={selectedDateRange}
        OrderSourceData={OrderSourceData}
        OrderTypeData={OrderTypeData}
        SelectEmpListData={SelectEmpListData}
      />
    </>
  );
};

export default MainSalesPerson;
