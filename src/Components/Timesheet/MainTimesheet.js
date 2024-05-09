import React from 'react'
import FilterTimesheet from './FilterTimesheet'
import DateRange from '../Orders/InstoreOrder/DateRange'
import TimesheetListing from './TimesheetListing'

const MainTimesheet = () => {
  return (
   <>
      <div className='q-category-main-page'>
    <FilterTimesheet />
   </div>
      <div className='q-category-main-page'>
        <div className='q-category-main-page'>
          {/* <DateRange /> */}
        </div>
          
        </div>
      <div className='q-category-main-page'>
        <TimesheetListing />

        </div>
   
   </>
  )
}

export default MainTimesheet