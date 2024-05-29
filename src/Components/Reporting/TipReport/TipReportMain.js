import React, { useState } from 'react';
import DateRange from '../../Orders/InstoreOrder/DateRange'
import TipReportList from './TipReportList';

const TipReportMain = () => {

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
        <TipReportList 
          selectedDateRange={selectedDateRange} 
          // VendorIdData={VendorIdData} 
                        
          />
         </div>
     </div>
    
    </>
  )
}

export default TipReportMain;