import React,{useEffect,useState} from 'react'
// import CustomerFunction from './customerFunction'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import {CustomerFunction } from '../../../Redux/features/user/customerSlice'
import { useSelector, useDispatch } from 'react-redux';



const Customer=()=> {
  const dispatch = useDispatch();
  const customerRecord = useSelector(
    (state) => state.customerRecord,
  );
  let data={type:2}


  useEffect(()=>{
    dispatch(CustomerFunction(data))

  },[])
  // const{customerRecord,handleEditCustomer,handleDeleteCustomer}=CustomerFunction()
  return (
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
          <p className='table20'>User Type</p>
          <p className='table5'>Action</p>
        </div>
      </div>
        <div className='table_body'>
          {
           Array.isArray(customerRecord && customerRecord.CustomerRecord) && customerRecord.CustomerRecord.map(result=>{
            return(
              <div className='table_row' key={result.id}>
                <p className='table25'>{result.name}</p>
                <p className='table30'>{result.email}</p>
                <p className='table20'>{result.phone}</p>
                <p className='table20'>{result.user_type}</p>
                <div className='table5' >
                <DropdownButton id="dropdown-basic-button" title="">
                 <Dropdown.Item ><Link to={`/user/editcustomer/${result.id}`}>edit</Link></Dropdown.Item>
              
                  
                </DropdownButton>
                </div>
              </div>

            )
           
           })
          }

          
        </div>
      </div>
  </div>
  )
}
export default Customer
