import React from 'react'
import FilterCatDetails from './FilterCatDetails'
import DateRange from '../../Orders/InstoreOrder/DateRange'
import DetailsSaleReport from './DetailsSaleReport'

const MainCatedetails = () => {
  return (
 <>

  <div className='q-order-main-page'>
 <FilterCatDetails />
 </div> 
 
 <div className='q-order-main-page'>
<DateRange />
 </div>
 

 <div className='q-order-main-page'>
<DetailsSaleReport />
 </div>
 
 {/* <div className='q-order-main-page'>
<DetailsSaleReport />
 </div> */}
 </>
  )
}

export default MainCatedetails