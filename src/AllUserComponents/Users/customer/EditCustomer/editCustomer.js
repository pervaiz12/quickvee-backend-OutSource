import React,{useEffect,useState} from 'react'
import '../../../../Styles/Common.css'
// import CustomerFunction from './customerFunction'
// import{GET_EDIT_CUSTOMER,BASE_URL} from '../../../../Constants/Config'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import {CustomerUpdate , updatecustomerData} from '../../../../Redux/features/user/customerSlice'
// import { useNavigate } from 'react-router-dom';
import EditCustomerFunction from './editCustomerFunction'
 
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams,
  } from "react-router-dom";

export default function EditCustomer() {
    const {handleEditData,customerData,handleChange,customerRadio,AdminRadio,merchantRadio,
        handleChangeRadio,handleSubmitCustomerRecord,successMessage,handleKeyPress,errors,onhandlePassword,password}=EditCustomerFunction()
    const  {id}  = useParams();
    useEffect(()=>{
         handleEditData(id)
    },[id])
  return (
    <div className='box'>
    <div className='box_shadow_div'>
        <p>{successMessage}</p>
        <div className='pd_20'>
            
            <h1 className='heading'>Edit Customer</h1>
           
          
                <div>
                    <div className='qvrow'>
                        <div className='col-qv-6'>
                            <div className='input_area'>
                                <label>Name</label>
                                <input 
                                    className=''
                                    type='text'
                                    name="name"
                                    value={customerData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <label className='error'>{errors.name}</label>
                            
                        </div>
                        
                        <div className='col-qv-6'>
                            <div className='input_area'>
                                <label>Email</label>
                                <input 
                                    className=''
                                    type='text'
                                    name="email"
                                    value={customerData && customerData.email}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>
                            {/* <label>{store.errors.ownerName}</label> */}
                        </div>
                    </div>
                    <div className='qvrow'>
                        <div className='col-qv-6'>
                            <div className='input_area'>
                                <label>Re-set</label>
                                <input 
                                    className=''
                                    type='text'
                                    name="reSet"
                                    onChange={handleChange}
                                    value={customerData.reSet}
                                />
                            </div>
                            {/* <label>{store.errors.email}</label> */}
                        </div>
                        <div className='col-qv-6'>
                            <div className='input_area'>
                                <label>Phone</label>
                                <input 
                                    className=''
                                    type='text'
                                    name="phone"
                                    value={customerData && customerData.phone}
                                    onChange={handleChange}
                                    onKeyPress={handleKeyPress}
                                    maxLength={10}
                                />
                            </div>
                            <label className='error'>{errors.phone}</label>
                        </div>
                    </div>
                   
                   
                    <input 
                        type='button'
                        className="blue_btn"
                        value="Submit"
                        onClick={handleSubmitCustomerRecord}
                    /> 
                     <div className='col-qv-6'>
                        <div className='input_rediobutton_area'>
                                <input
                                    className='inputredio'
                                    type="radio"
                                    id="radio2"
                                    name="radio" 
                                    value="admin"
                                    checked={AdminRadio}
                                    onChange={handleChangeRadio}
                                    // onClick={onClickUserRadio}
                                />
                                <label htmlFor="radio2">Admin</label>
                        </div>
                        <div className='input_rediobutton_area'>
                                <input
                                    className='inputredio'
                                    type="radio"
                                    id="radio1"
                                    name="radio"
                                    value="merchant" 
                                    checked={merchantRadio}
                                    onChange={handleChangeRadio}
                                    // onClick={onClickUserRadio}
                                />
                                <label htmlFor="radio1">Merchant</label>
                        </div>
                        <div className='input_rediobutton_area'>
                                <input
                                    className='inputredio'
                                    type="radio"
                                    id="radio3"
                                    name="radio"
                                    value="customer" 
                                    checked={customerRadio}
                                    onChange={handleChangeRadio}
                                    // onClick={onClickUserRadio}customerRadio,AdminRadio,merchantRadio
                                />
                                <label htmlFor="radio3">Customer</label>
                        </div>
                        {/* <label>{radioErros}</label> */}
                    </div>
                </div>
                
          
          
        </div>
        
        
    </div>  
        

</div>
  )
}
