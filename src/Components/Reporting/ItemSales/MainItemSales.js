import React from 'react'
import ItemSalesFilter from './ItemSalesFilter'
import DateRange from '../../Orders/InstoreOrder/DateRange'
import NetSalesFilter from './NetSalesFilter'
import ItemSalesDetails from './ItemSalesDetails'

const MainItemSales = () => {
  return (
   <>

   <div className='q-order-main-page'>
    <DateRange />

   </div>
  <div className='q-order-main-page'>
<ItemSalesFilter />
 </div>
 <div className='q-order-main-page'>
  <NetSalesFilter />
 </div>
 <div className='q-order-main-page'>
  <ItemSalesDetails />
 </div>
   
   
   </>
  )
}

export default MainItemSales