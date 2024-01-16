import React from 'react'
import DateRange from '../../Orders/InstoreOrder/DateRange'
import TaxesFilter from './TaxesFilter'
import TaxesDetails from './TaxesDetails'

const MainTaxesReport = () => {
  return (
  <>

  <div className='q-order-main-page'>
    <TaxesFilter />
  </div>
  <div className='q-order-main-page'>
    <DateRange />

  </div>
  
  <div className='q-order-main-page'>
    <TaxesDetails />

  </div>
  </>
  )
}

export default MainTaxesReport