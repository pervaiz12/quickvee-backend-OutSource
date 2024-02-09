import React, { useState } from 'react';
import StoreOrderFilter from './StoreOrderFilter';
import StoreOrderList from './StoreOrderList';

const StoreOrderMain = () => {

    const [OrderStatusData, setOrderStatusData] = useState(null);
    const [OrderTypeData, setOrderTypeData] = useState(null);

    const handleFilterDataChange = (OrderStatus , OrderType) => {
        setOrderStatusData(OrderStatus);
        setOrderTypeData(OrderType);
    };

    return (
        <>
            <div className='q-order-main-page'>
                <StoreOrderFilter 
                    onFilterDataChange={handleFilterDataChange}
                />
            </div>
            <div className='mt-10'>
                <div className="q-attributes-main-page">
                    <StoreOrderList 
                        OrderStatusData={OrderStatusData} 
                        OrderTypeData={OrderTypeData} 
                    />
                </div>
            </div>
        </>
    )
}

export default StoreOrderMain
