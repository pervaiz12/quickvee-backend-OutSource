import React from 'react'
import SalesPersonFilter from './SalesPersonFilter'
import DateRange from '../../Orders/InstoreOrder/DateRange'
import SalesPersonReport from './SalesPersonReport'

const MainSalesPerson = () => {
  return (
    <>
    <div className='q-order-main-page'>
        <SalesPersonFilter />
    </div>

    <div className='q-order-main-page'>
        <DateRange />
    </div>

    <div className='q-order-main-page'>
        <SalesPersonReport />

    </div>
    
    </>
  )
}

export default MainSalesPerson
