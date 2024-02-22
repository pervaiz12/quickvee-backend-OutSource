import React from 'react'
import MainAddEmployee from '../../StoreSetting/AddEmployee/MainAddEmployee'
import MainEmployee from './MainEmployee'
import DateRange from '../../Orders/InstoreOrder/DateRange'
import Employeedetails from './Employeedetails'

const EmployeeWorking = () => {
  return (
    <div>
      
      <div className='q-order-main-page'>
        <MainEmployee />

      </div>

      <div className='q-order-main-page'>
        <div className='box'>
       <DateRange />
      </div>
      </div>

      <div className='q-order-main-page'>
        <Employeedetails />

      </div>

    </div>
  )
}

export default EmployeeWorking
