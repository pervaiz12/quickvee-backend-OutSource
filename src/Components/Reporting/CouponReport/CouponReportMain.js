import React, { useState } from 'react';
import DateRange from '../../Orders/InstoreOrder/DateRange'
import CouponReportList from './CouponReportList';

const CouponReportMain = () => {

    const [selectedDateRange, setSelectedDateRange] = useState(null);
    const handleDateRangeChange = (dateRange) => {
        setSelectedDateRange(dateRange);
    };

  return (
    <>
    <div className="q-attributes-main-page">
        <div className='box'>
          <DateRange 
            onDateRangeChange={handleDateRangeChange}
          />
        </div>
    </div><br></br>


    <div className='mt-10'>
      <div className="q-attributes-main-page">
        <CouponReportList 
          selectedDateRange={selectedDateRange} 
          // VendorIdData={VendorIdData} 
                        
          />
         </div>
     </div>
    
    </>
  )
}

export default CouponReportMain;