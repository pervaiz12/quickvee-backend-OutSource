import React, { useState } from 'react';
import OrderRefundFilter from './OrderRefundFilter';
import DateRange from '../../Orders/InstoreOrder/DateRange'
import OrderRefundReportList from './OrderRefundReportList'

const OrderRefundReportMain = () => {
// console.log(onCategoryChange)
    const [selectedDateRange, setSelectedDateRange] = useState(null);
    const handleDateRangeChange = (dateRange) => {
        setSelectedDateRange(dateRange);
    };

    // const initialCategory = "all";  // Replace this with the initial category value you want
    const initialReason = "all";    // Replace this with the initial reason value you want
    // const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [selectedReason, setSelectedReason] = useState(initialReason);

    // const handleCategoryChange = (selectedCategoryId) => {
    //     setSelectedCategory(selectedCategoryId);
    // };

    const handleReasonChange = (selectedReason) => {
        setSelectedReason(selectedReason);
    };

    // console.log(selectedCategory)

    return (
        <>
            <div className='q-order-main-page'>
                <OrderRefundFilter 
                    title={"Order Refund Report"} 
                    // onCategoryChange={handleCategoryChange}
                    onReasonChange={handleReasonChange} 
                    
                />
            </div>
            <div className="q-attributes-main-page">
                <DateRange 
                    onDateRangeChange={handleDateRangeChange}
                />
            </div>
            <div className='mt-10'>
                <div className="q-attributes-main-page">
                    <OrderRefundReportList 
                        selectedDateRange={selectedDateRange} 
                        // categoryId={selectedCategory} 
                        reasonTitle={selectedReason}
                        
                    />
                </div>
            </div>
        </>
    )
}

export default OrderRefundReportMain