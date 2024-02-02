import React from 'react'
import MainHeaderOrder from "../MainOrderSumaaryDetails/MainHeaderOrder";
import OrderStatusSummary from './OrderStatusSummary';

const OrderSummaryDetails = () => {
  return (
  
  <>
  <MainHeaderOrder />


  <div className='q-order-main-page'>
    <OrderStatusSummary />
  </div>
  </>
  )
}

export default OrderSummaryDetails
