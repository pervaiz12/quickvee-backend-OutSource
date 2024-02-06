import React from 'react'
import MainHeaderOrder from "../MainOrderSumaaryDetails/MainHeaderOrder";
import OrderStatusSummary from './OrderStatusSummary';

const OrderSummaryDetails = () => {
  return (
  
  <>
  <MainHeaderOrder />


  <div className='q-order-main-page mx-14'>
    <OrderStatusSummary />
  </div>


  
  </>
  )
}

export default OrderSummaryDetails
