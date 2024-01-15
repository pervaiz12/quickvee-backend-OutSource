import React from 'react'
import SiftSetting from './SiftSetting'
import DateRange from '../../Orders/InstoreOrder/DateRange'

const MainSiftSummary = () => {
  return (
<>
<div className='q-order-main-page'>
<SiftSetting />
 </div>

 <div className='q-order-main-page'>
    <DateRange />
 </div>


</>
  )
}

export default MainSiftSummary
