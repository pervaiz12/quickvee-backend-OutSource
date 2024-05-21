import React,{useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import{ManagerRecord} from '../../../Redux/features/user/managerSlice'
import ManagerFunctionality from './managerFunctionality'
import ViewMerchant from './viewMerchantModel'
import { useAuthDetails } from '../../../Common/cookiesHelper';



export default function Manager() {
  const{setShowMerchant,showMerchant,handleViewMerchant,handleCloseMerchantModel,showMerchantData,name}=ManagerFunctionality()
  const {LoginGetDashBoardRecordJson,LoginAllStore,userTypeData} = useAuthDetails();

    const dispatch = useDispatch()
    const managerList = useSelector(
      (state) => state.managerRecord,
    );
    
    // state.managerRecord.ManagerRecord
    useEffect(()=>{
        dispatch(ManagerRecord(userTypeData))

    },[])
    // ====================================
    const [searchRecord,setSearchRecord]=useState('')

    const handleSearchInputChange=(e)=>{
      setSearchRecord(e.target.value)
    }
    const filteredAdminRecord = managerList && managerList.ManagerRecord &&  Array.isArray(managerList.ManagerRecord)
    ? managerList.ManagerRecord.filter(result =>
        (result.name && result.name.toLowerCase().includes(searchRecord.toLowerCase())) ||
        (result.email && result.email.toLowerCase().includes(searchRecord.toLowerCase())) ||
        (result.phone && result.phone.includes(searchRecord))
      )
    : [];
    // ====================================

  return (
    <>
    <div className='q-order-main-page'>
    <div className='box'>
    <div className='box_shadow_div'>
      <div className='qvrow'>
          <div className='col-qv-8'>
            {/* <div className='btn-area'>
              <Link to="/users/addMerchant"className='blue_btn'>ADD</Link>
            </div>  */}
          </div>
          <div className='col-qv-4'>
              <div className='seacrh_area'>
              <div className="input_area">
                <input className="" type="text" value={searchRecord}
                onInput={handleSearchInputChange}
                placeholder="Search..."
                autoComplete="off"
                />
              </div>
              </div>
          </div>

      </div>
      <div className='table_main_area'>
        <div className='table_header_sticky'>
          <div className='table_header_top'>
            {/* <h1>Table Area</h1> */}
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
              // filteredAdminRecord
              // managerList && Array.isArray(managerList.ManagerRecord) && managerList.ManagerRecord.map((result,index)=>{
                managerList && Array.isArray(managerList.ManagerRecord) && filteredAdminRecord.map((result,index)=>{
                
                // console.log(result)
                return(
                  <div className='table_row' key={index}>
                    <p className='table25'>{result.name}</p>
                    <p className='table30'>{result.email}</p>
                    <p className='table20'>{result.phone}</p>
                    <p className='table20' onClick={()=>handleViewMerchant(result.merchant_id,result.name,userTypeData)} ><span className="viewMerchant">View Merchant</span></p>
                   
                  </div>
  
                )
                
              })

            } 
            
          </div>
      </div>
      
    </div>
    </div>
    </div>
    <ViewMerchant
    showMerchant={showMerchant}
    showMerchantData={showMerchantData}
    name={name}
    handleCloseMerchantModel={handleCloseMerchantModel}
    
    />
    </>

  
  )
}
