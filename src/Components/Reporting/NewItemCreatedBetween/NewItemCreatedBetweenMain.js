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
            <div className="q-attributes-main-page">
                <DateRange 
                    onDateRangeChange={handleDateRangeChange}
                />
            </div>
            <div className='mt-10'>
                <div className="q-attributes-main-page">
                    <NewItemCreatedBetweenList 
                        selectedDateRange={selectedDateRange} 
                    />
                </div>
            </div>
        </>
    )
}

export default NewItemCreatedBetweenMain
