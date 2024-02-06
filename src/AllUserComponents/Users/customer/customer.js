import React,{useEffect,useState} from 'react'

// import 'bootstrap/dist/css/bootstrap.min.css';cls

import {CustomerFunction } from '../../../Redux/features/user/customerSlice'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const Customer=()=> {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customerRecord = useSelector(
    (state) => state.customerRecord,
  );
  let data={type:2}


  useEffect(()=>{
    dispatch(CustomerFunction(data))

  },[])

  // ------------------------------------
  const [selectedAction, setSelectedAction] = useState('');

  const handleSelectChange = (e) => {
    const selectedUrl = e.target.value;
    const urlParts = selectedUrl.split('/');
    if(urlParts[2]=="editCustomer"){
      navigate(`${selectedUrl}`);
     
    }else {
      console.log('hello delet')
    }
  };
  // ----------------------------------

 


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
           Array.isArray(customerRecord && customerRecord.CustomerRecord) && customerRecord.CustomerRecord.map((result,index)=>{
            console.log(result)
            return(
              <div className='table_row' key={index}>
                <p className='table25'>{result.name}</p>
                <p className='table30'>{result.email}</p>
                <p className='table20'>{result.phone}</p>
                <p className='table20'>{result.user_type}</p>
                <div className='table5' >
                <div className='col-qv-6'>
                <div className='input_area'>
                  <select
                  value={selectedAction}
                  onChange={handleSelectChange}
                  >
                  <option  value="" disabled hidden></option>
                  <option value={`/users/editCustomer/${result.id}`}>Edit</option>
                  <option value={`/users/deleteCustomer/${result.id}`}>Delete</option>
                  
                  </select>
                </div>
                   
                </div>
                
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
