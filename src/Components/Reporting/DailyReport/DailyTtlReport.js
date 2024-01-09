import React from 'react'
import DateRange from '../../Orders/InstoreOrder/DateRange'
import DailyReportList from './DailyReportList'

const DailyTtlReport = () => {
  return (

<>
<div className="q-attributes-main-page">
<DateRange />
</div>
<div className='mt-10'>
<div className="q-attributes-main-page">
<DailyReportList />
</div>
</div>

</>
  )
}

export default DailyTtlReport
