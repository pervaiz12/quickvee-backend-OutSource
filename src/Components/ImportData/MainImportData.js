import React from 'react'
import ImportData from './ImportData'
import Csvimport from './Csvimport'

const MainImportData = () => {
  return (
   <>
      <div className='q-order-main-page'>
   <ImportData />
   </div>
      <div className='q-order-main-page'>
   <Csvimport />
   </div>

   
   </>
  )
}

export default MainImportData


