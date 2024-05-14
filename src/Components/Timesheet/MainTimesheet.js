import React, { useState, useEffect, useRef } from "react";
import FilterTimesheet from './FilterTimesheet'
import DateRange from '../Orders/InstoreOrder/DateRange'
import TimesheetListing from './TimesheetListing'

const MainTimesheet = () => {

  const [filteredData, setFilteredData] = useState([]);
  const [selectedEmployeeID, setSelectedEmployeeID] = useState("all");

  const handleDataFiltered = (data) => {
    const updatedData = {
        ...data,
        merchant_id: "MAL0100CA",
        employee_id:selectedEmployeeID,
      };
      setFilteredData(updatedData);
  }



  return (
   <>
    <div className='q-category-main-page'>
      <FilterTimesheet selectedEmployeeID={selectedEmployeeID} setSelectedEmployeeID={setSelectedEmployeeID} />
    </div>
      <div className='q-category-main-page'>
        <div className='q-category-main-page'>
          <DateRange onDateRangeChange={handleDataFiltered} />
        </div>
          
        </div>
      <div className='q-category-main-page'>
        <TimesheetListing data={filteredData}/>

      </div>
   
   </>
  )
}

export default MainTimesheet