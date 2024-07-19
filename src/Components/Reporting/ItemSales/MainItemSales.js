import React, { useState } from "react";
import ItemSalesFilter from "./ItemSalesFilter";
import DateRange from "../../Orders/InstoreOrder/DateRange";
import NetSalesFilter from "./NetSalesFilter";
import ItemSalesDetails from "./ItemSalesDetails";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import useDebounce from "../../../hooks/useDebouncs";

const MainItemSales = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [OrderSourceData, setOrderSourceData] = useState(null);
  const [OrderTypeData, setOrderTypeData] = useState(null);
  const [SelectCatData, setSelectCatData] = useState(null);
  const [items, setItems] = useState("");

  const [searchRecord, setSearchRecord] = useState("");
  const debouncedValue = useDebounce(searchRecord, 500);

  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  const handleFilterDataChange = (OrderSource, OrderType, SelectCat,searchItems) => {
    setOrderSourceData(OrderSource);
    setOrderTypeData(OrderType);
    setSelectCatData(SelectCat);
    setItems(searchItems)
  };

  return (
    <>
      <ItemSalesFilter onFilterDataChange={handleFilterDataChange} setSearchRecord={setSearchRecord} debouncedValue={debouncedValue} />
        { !debouncedValue ? ( <DateRangeComponent onDateRangeChange={handleDateRangeChange} />):("")}
      {/* <DateRangeComponent onDateRangeChange={handleDateRangeChange} /> */}
      <NetSalesFilter />

      <ItemSalesDetails
        selectedDateRange={selectedDateRange}
        OrderSourceData={OrderSourceData}
        OrderTypeData={OrderTypeData}
        SelectCatData={SelectCatData}
        items={debouncedValue}
      />
    </>
  );
};

export default MainItemSales;
