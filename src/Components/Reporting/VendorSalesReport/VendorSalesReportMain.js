import React, { useState } from 'react';
import FilterVendorList from '../VendorDetails/FilterVendorList'
import DateRange from '../../Orders/InstoreOrder/DateRange'
import VendorSalesReportList from './VendorSalesReportList'

const VendorSalesReportMain = () => {

    const [selectedDateRange, setSelectedDateRange] = useState(null);
    const handleDateRangeChange = (dateRange) => {
        setSelectedDateRange(dateRange);
    };

    const [VendorIdData, setVendorIdData] = useState(null);
    

    const handleFilterDataChange = (VendorId) => {
        setVendorIdData(VendorId);
    };

    return (
        <>
            <div className='q-order-main-page'>
                <FilterVendorList 
                    title={"Vendor Payout Report"} 
                    onVendorChange={handleFilterDataChange} 
                    
                />
            </div>
            <div className="q-attributes-main-page">
                <div className='box'>
                <DateRange 
                    onDateRangeChange={handleDateRangeChange}
                />
            </div>
            </div>
            <div className='mt-10'>
                <div className="q-attributes-main-page">
                    <VendorSalesReportList 
                        selectedDateRange={selectedDateRange} 
                        VendorIdData={VendorIdData} 
                        
                    />
                </div>
            </div>
        </>
    )
}

export default VendorSalesReportMain