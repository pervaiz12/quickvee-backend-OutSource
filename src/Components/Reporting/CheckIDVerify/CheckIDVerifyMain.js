import React, { useState } from 'react';
import FilterCatDetails from '../CategoryDetails/FilterCatDetails'
import CheckIDVerifyList from './CheckIDVerifyList'
import DateRangeComponent from '../../../reuseableComponents/DateRangeComponent';

const CheckIDVerifyMain = () => {

    const [selectedDateRange, setSelectedDateRange] = useState(null);
    const handleDateRangeChange = (dateRange) => {
        setSelectedDateRange(dateRange);
    };

    const [OrderSourceData, setOrderSourceData] = useState(null);
    const [OrderTypeData, setOrderTypeData] = useState(null);
    const [SelectCatData, setSelectCatData] = useState(null);

    const handleFilterDataChange = (OrderSource , OrderType , SelectCat) => {
        setOrderSourceData(OrderSource);
        setOrderTypeData(OrderType);
        setSelectCatData(SelectCat);
    };

    return (
        <>
            <div className='q-order-main-page'>
                <FilterCatDetails 
                    onFilterDataChange={handleFilterDataChange} 
                    title={"Check ID Verification Report"} 
                    showcat={"0"}
                />
            </div>
            <div className="q-attributes-main-page">
                <div className='box'>
                <DateRangeComponent 
                    onDateRangeChange={handleDateRangeChange}
                />
            </div>
            </div>
            <div className='mt-10'>
                <div className="q-attributes-main-page">
                    <CheckIDVerifyList 
                        selectedDateRange={selectedDateRange} 
                        OrderSourceData={OrderSourceData} 
                        OrderTypeData={OrderTypeData} 
                        SelectCatData={SelectCatData} 
                    />
                </div>
            </div>
        </>
    )
}

export default CheckIDVerifyMain