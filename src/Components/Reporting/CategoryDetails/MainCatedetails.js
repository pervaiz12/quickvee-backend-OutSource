import React from 'react';
import FilterCatDetails from './FilterCatDetails'
import DateRange from '../../Orders/InstoreOrder/DateRange'
import DetailsSaleReport from './DetailsSaleReport'

const MainCatedetails = () => {
  return (
    <>
    <div className='q-category-main-page'>
<FilterCatDetails />
</div> 

<div className='q-category-main-page'>
<DateRange />
</div>


<div className='q-category-main-page'>
<DetailsSaleReport />
</div>
    
    </>
  )
}

export default MainCatedetails






