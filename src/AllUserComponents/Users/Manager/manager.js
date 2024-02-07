import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import{ManagerRecord} from '../../../Redux/features/user/managerSlice'
import ManagerFunctionality from './managerFunctionality'
import ViewMerchant from './viewMerchantModel'


export default function Manager() {
  const{setShowMerchant,showMerchant,handleViewMerchant,handleCloseMerchantModel,showMerchantData}=ManagerFunctionality()
    const dispatch = useDispatch()
    const managerList = useSelector(
      (state) => state.managerRecord,
    );
    
    // state.managerRecord.ManagerRecord
    useEffect(()=>{
        dispatch(ManagerRecord())

    },[])
  return (
    <>
    <div className='box_shadow_div'>
      <div className='table_main_area'>
        <div className='table_header_sticky'>
          <div className='table_header_top'>
            <h1>Table Area</h1>
          </div>
          <div className='table_header'>
            <p className='table25'>Name</p>
            <p className='table30'>Email</p>
            <p className='table20'>Phone</p>
            <p className='table5'>View</p>
          </div>
        </div>
          <div className='table_body'>
            {
              managerList && Array.isArray(managerList.ManagerRecord) && managerList.ManagerRecord.map((result,index)=>{
                // console.log(result)
                return(
                  <div className='table_row' key={index}>
                    <p className='table25'>{result.name}</p>
                    <p className='table30'>{result.email}</p>
                    <p className='table20'>{result.phone}</p>
                    <p className='table20' onClick={()=>handleViewMerchant(result.merchant_id)} >View Merchant</p>
                   
                  </div>
  
                )
                
              })

            } 
            
          </div>
      </div>
      
    </div>
    <ViewMerchant
    showMerchant={showMerchant}
    showMerchantData={showMerchantData}
    handleCloseMerchantModel={handleCloseMerchantModel}
    
    />
    </>

  
  )
}
