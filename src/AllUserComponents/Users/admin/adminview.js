import React,{useState,useEffect} from 'react'
import {AdminFunction} from '../../../Redux/features/user/adminSlice'

import { useSelector, useDispatch } from 'react-redux';
import AdminFunctionality from './adminFunctionality'
import ViewAdmin from './viewAdminModal'
import { useNavigate } from 'react-router-dom';

export default function AdminView() {
    const navigate = useNavigate();
    // const{setShowMerchant,showMerchant,handleViewAdmin,handleCloseMerchantModel,showMerchantData}=AdminFunctionality()
    const {handleCloseAdminModel,handleViewAdmin,showAdmin,showMerchantData}=AdminFunctionality()
    const dispatch = useDispatch();
    const AdminRecord = useSelector(
        (state) => state.adminRecord,
      );
    //   console.log(AdminRecord.AdminRecord)

    useEffect(()=>{
        dispatch(AdminFunction())
    },[])
// ---------------------------
const [selectedAction, setSelectedAction] = useState('');

  const handleSelectChange = (e) => {
    const selectedUrl = e.target.value;
    const urlParts = selectedUrl.split('/');
    const url=window.location.href
    
    if(urlParts[2]=="editAdmin"){
      
      navigate(`${selectedUrl}`);
     
    }else {
      console.log('hello delet')
    }
  };

// ---------------------------

  return (
    <>
    <div className='box_shadow_div'>
        <div className='table_main_area'>
        <div className='table_header_sticky'>
            <div className='table_header_top'>
            <h1>Table Area</h1>
            </div>
            <div className='table_header'>
            <p className='table20'>Owner Name</p>
            <p className='table20'>Name</p>
            <p className='table20'>Email</p>
            <p className='table20'>Phone</p>
            <p className='table15'>View</p>
            <p className='table5'>Action</p>
            </div>
        </div>
        <div className='table_body'>
            {
                Array.isArray(AdminRecord && AdminRecord.AdminRecord) ?AdminRecord.AdminRecord.map(result=>{
                    // console.log(result)
                    return(
                        
                            <div className='table_row' key={result.id}>
                                <p className='table20'>{result.owner_name}</p>
                                <p className='table20'>{result.name}</p>
                                <p className='table20'>{result.email}</p>
                                <p className='table20'>{result.phone}</p>
                                <p className='table15'onClick={()=>handleViewAdmin(result.email)}>view merchant</p>
                                <div className='table5' >
                                <select
                                    value={selectedAction}
                                    onChange={handleSelectChange}
                                    >
                                    <option  value="" disabled hidden></option>
                                    <option value={`/users/editAdmin/${result.id}`}>Edit</option>
                                    {/* <option value={result.id}>Delete</option> */}
                                </select>
                                 
                                </div>
                            </div>
            
                            
                        )
                }):[]
            }
        </div>
        </div>
  </div>
  <ViewAdmin
    showAdmin={showAdmin}
    showMerchantData={showMerchantData}
    handleCloseAdminModel={handleCloseAdminModel}
    
    />
  </>
  )
}
