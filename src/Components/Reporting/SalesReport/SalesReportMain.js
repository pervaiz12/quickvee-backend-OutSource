import React, { useState } from 'react';
import DateRange from '../../Orders/InstoreOrder/DateFilter'
import SalesReportList from './SalesReportList'

const SalesReportMain = () => {

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
                    <SalesReportList 
                        selectedDateRange={selectedDateRange} 
                        // VendorIdData={VendorIdData} 
                        
                    />
                </div>
            </div>
        </>
    )
}

export default SalesReportMain