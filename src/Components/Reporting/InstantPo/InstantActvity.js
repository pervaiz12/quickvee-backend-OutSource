import React from 'react'
import DateRange from '../../Orders/InstoreOrder/DateRange'
import MainInstantDetails from './MainInstantDetails'

const InstantActvity = () => {
  return (
  <>
  <div className=''>
  <div className='q-order-main-page'>
<DateRange />
 </div>

 <div className='q-order-main-page'>
<MainInstantDetails />
 </div>
  </div>
  
  </>
  )
}

export default InstantActvity