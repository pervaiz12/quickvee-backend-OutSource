import React from 'react'
import SiftSetting from './SiftSetting'
import DateRange from '../../Orders/InstoreOrder/DateRange'
import SiftSummaryDetails from './SiftSummaryDetails'

const MainSiftSummary = () => {
  return (
<>
<div className='q-order-main-page'>
<SiftSetting />
 </div>

 <div className='q-order-main-page'>
  <div className='box'>
    <DateRange />
 </div>
 </div>

<div className='q-order-main-page'>
  <SiftSummaryDetails />
</div>

</>
  )
}

export default MainSiftSummary
