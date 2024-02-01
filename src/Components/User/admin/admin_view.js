import React,{useState,useEffect} from 'react'
import {AdminFunction} from '../../../Redux/features/user/adminSlice'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useSelector, useDispatch } from 'react-redux';
import AdminFunctionality from './adminFunctionality'
import ViewAdmin from './viewAdminModal'
import { Link } from "react-router-dom";
export default function AdminView() {
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
                                    {/* to={`/user/editcustomer/${result.id}`} */}
                                <DropdownButton id="dropdown-basic-button" title="">
                                <Dropdown.Item ><Link to={`/user/editAdmin/${result.id}`}>edit</Link></Dropdown.Item>
                            
                                
                                </DropdownButton>
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
