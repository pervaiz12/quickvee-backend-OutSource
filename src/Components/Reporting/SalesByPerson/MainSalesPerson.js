import React, { useState } from 'react'
import SalesPersonFilter from './SalesPersonFilter'
import DateRange from '../../Orders/InstoreOrder/DateRange'
import SalesPersonReport from './SalesPersonReport'

const MainSalesPerson = () => {

  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [OrderSourceData, setOrderSourceData] = useState(null);
  const [OrderTypeData, setOrderTypeData] = useState(null);
  const [SelectEmpListData, setSelectEmpListData] = useState(null);

  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  const handleFilterDataChange = (OrderSource , OrderType , SelectEmpList) => {
    setOrderSourceData(OrderSource);
    setOrderTypeData(OrderType);
    setSelectEmpListData(SelectEmpList);
  };
  return (
    <>
      <div className='q-order-main-page'>
        <SalesPersonFilter 
          onFilterDataChange={handleFilterDataChange} 
        />
      </div>

      <div className='q-order-main-page'>
        <DateRange 
          onDateRangeChange={handleDateRangeChange}
        />
      </div>

      <div className='q-order-main-page'>
        <SalesPersonReport 
          selectedDateRange={selectedDateRange} 
          OrderSourceData={OrderSourceData} 
          OrderTypeData={OrderTypeData} 
          SelectEmpListData={SelectEmpListData} 
        />
      </div>
    </>
  )
}

export default MainSalesPerson
