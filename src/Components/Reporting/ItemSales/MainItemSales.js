import React, { useState } from "react";
import ItemSalesFilter from "./ItemSalesFilter";
import DateRange from "../../Orders/InstoreOrder/DateRange";
import NetSalesFilter from "./NetSalesFilter";
import ItemSalesDetails from "./ItemSalesDetails";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";

const MainItemSales = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [OrderSourceData, setOrderSourceData] = useState(null);
  const [OrderTypeData, setOrderTypeData] = useState(null);
  const [SelectCatData, setSelectCatData] = useState(null);

  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  const handleFilterDataChange = (OrderSource, OrderType, SelectCat) => {
    setOrderSourceData(OrderSource);
    setOrderTypeData(OrderType);
    setSelectCatData(SelectCat);
  };

  return (
    <>
      <ItemSalesFilter onFilterDataChange={handleFilterDataChange} />

      <DateRangeComponent onDateRangeChange={handleDateRangeChange} />

      <NetSalesFilter />

      <ItemSalesDetails
        selectedDateRange={selectedDateRange}
        OrderSourceData={OrderSourceData}
        OrderTypeData={OrderTypeData}
        SelectCatData={SelectCatData}
      />
    </>
  );
};

export default MainItemSales;
