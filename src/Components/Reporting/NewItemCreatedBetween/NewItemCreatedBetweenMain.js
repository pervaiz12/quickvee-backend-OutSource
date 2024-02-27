import React, { useState } from 'react';
import DateRange from '../../Orders/InstoreOrder/DateRange'
import NewItemCreatedBetweenList from './NewItemCreatedBetweenList'

const NewItemCreatedBetweenMain = () => {

    const [selectedDateRange, setSelectedDateRange] = useState(null);
    const handleDateRangeChange = (dateRange) => {
        setSelectedDateRange(dateRange);
    };

    return (
        <>
            <div className="q-order-main-page">
                <div className='box'>
                <DateRange 
                    onDateRangeChange={handleDateRangeChange}
                />
            </div>
            </div>
            
                <div className="q-order-main-page">
                    <NewItemCreatedBetweenList 
                        selectedDateRange={selectedDateRange} 
                    />
                </div>
           
        </>
    )
}

export default NewItemCreatedBetweenMain
