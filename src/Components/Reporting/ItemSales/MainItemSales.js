import React, { useState } from 'react';
import ItemSalesFilter from './ItemSalesFilter'
import DateRange from '../../Orders/InstoreOrder/DateRange'
import NetSalesFilter from './NetSalesFilter'
import ItemSalesDetails from './ItemSalesDetails'

const MainItemSales = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [OrderSourceData, setOrderSourceData] = useState(null);
  const [OrderTypeData, setOrderTypeData] = useState(null);
  const [SelectCatData, setSelectCatData] = useState(null);

  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  const handleFilterDataChange = (OrderSource , OrderType , SelectCat) => {
    setOrderSourceData(OrderSource);
    setOrderTypeData(OrderType);
    setSelectCatData(SelectCat);
  };

  return (
    <>
      <div className='q-order-main-page'>
        <ItemSalesFilter 
           onFilterDataChange={handleFilterDataChange} 
        />
      </div>
      <div className='q-order-main-page'>
        <DateRange 
          onDateRangeChange={handleDateRangeChange}
        />
      </div>
      <div className='q-order-main-page'>
        <NetSalesFilter />
      </div>
      <div className='q-order-main-page'>
        <ItemSalesDetails 
          selectedDateRange={selectedDateRange} 
          OrderSourceData={OrderSourceData} 
          OrderTypeData={OrderTypeData} 
          SelectCatData={SelectCatData} 
        />
      </div>
    </>
  )
}

export default MainItemSales