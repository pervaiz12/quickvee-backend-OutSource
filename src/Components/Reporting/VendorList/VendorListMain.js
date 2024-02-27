import React, { useState } from 'react';
// import FilterVendorList from '../VendorDetails/FilterVendorList'
// import DateRange from '../../Orders/InstoreOrder/DateRange';
import VendorReportList from './VendorReportList'

const VendorListMain = () => {

    // const [selectedDateRange, setSelectedDateRange] = useState(null);
    // const handleDateRangeChange = (dateRange) => {
    //     setSelectedDateRange(dateRange);
    // };

    // const [VendorIdData, setVendorIdData] = useState(null);
    

    // const handleFilterDataChange = (VendorId) => {
    //     setVendorIdData(VendorId);
    // };

    return (
        <>
            {/* <div className='q-order-main-page'>
                <FilterVendorList 
                    title={"Vendor Payout Report"} 
                    // onVendorChange={handleFilterDataChange} 
                    
                />
            </div> */}
            {/* <div className="q-attributes-main-page">
                <DateRange 
                    onDateRangeChange={handleDateRangeChange}
                />
            </div> */}
            <div className='mt-10'>
                <div className="q-order-main-page">
                    <VendorReportList 
                        // selectedDateRange={selectedDateRange} 
                        // VendorIdData={VendorIdData} 
                        
                    />
                </div>
            </div>
        </>
    )
}

export default VendorListMain