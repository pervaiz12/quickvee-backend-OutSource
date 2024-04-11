import React, { useState } from 'react'
// import MainAddEmployee from '../../StoreSetting/AddEmployee/MainAddEmployee'
import MainEmployee from './MainEmployee'
import DateRange from '../../Orders/InstoreOrder/DateRange'
import Employeedetails from './Employeedetails'

const EmployeeWorking = () => {
  const [SelectEmpIDData, setSelectEmpIDData] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const handleFilterDataChange = (SelectEmpID) => {
    setSelectEmpIDData(SelectEmpID);
  };

  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  return (
    <div>
      
      <div className='q-order-main-page'>
        <MainEmployee 
          onFilterDataChange={handleFilterDataChange}
        />

      </div>

      <div className='q-order-main-page'>
        <div className='box'>
       <DateRange 
        onDateRangeChange={handleDateRangeChange} 
       />
      </div>
      </div>

      <div className='q-order-main-page'>
        <Employeedetails 
          selectedDateRange={selectedDateRange} 
          EmpId={SelectEmpIDData}
        />

      </div>

    </div>
  )
}

export default EmployeeWorking
