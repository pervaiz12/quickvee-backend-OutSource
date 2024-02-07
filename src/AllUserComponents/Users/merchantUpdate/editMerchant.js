import React,{useEffect} from 'react'
import EditMerchantFunctionality from './editMerchantFunctionality'
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams,
  } from "react-router-dom";

export default function EditMerchant() {
    const{getEditMerchantData,getEditMerchant,handleChangePaymentMode,paymentModeOnline,paymentModeOffline}=EditMerchantFunctionality()
    const  {id}  = useParams();
    // console.log(id)
    useEffect(()=>{
        // console.log(id)
        getEditMerchantData(id)
   },[id])
  return (
    <div className='box'>
    <div className='box_shadow_div'>
        <div className='pd_20'>
            <h1 className='heading'>Edit Merchant</h1>
                <div>
                    <div className='qvrow'>
                        <div className='col-qv-6'>
                            <div className='input_area'>
                                <label>User name</label>
                                <input 
                                    className=''
                                    type='text'
                                    name="owner_name"
                                    value={getEditMerchant.username}
                                    // value={editData.owner_name}
                        
                                    // onChange={handleChangeAdmin}
                                />
                            </div>
                            
                        </div>
                        
                        <div className='col-qv-6'>
                            <div className='input_area'>
                                <label>Name</label>
                                <input 
                                    className=''
                                    type='text'
                                    name="email"
                                    value={getEditMerchant.name}
                                    // onChange={handleChangeAdmin}
                                />
                            </div>
                            {/* <label>{store.errors.ownerName}</label> */}
                        </div>
                    </div>
                    <div className='qvrow'>
                        <div className='col-qv-4'>
                            <div className='input_area'>
                                <label>Merchant ID</label>
                                <input 
                                    className=''
                                    type='text'
                                    name="password"
                                    value={getEditMerchant.merchant_id}
                                    // value={editData.password}
                                    // onChange={handleChangeAdmin}
                                    // value={store.email}
                                    disabled
                                />
                            </div>
                            {/* <label>{store.errors.email}</label> */}
                        </div>
                        <div className='col-qv-4'>
                            <div className='input_area'>
                                <label>Reset Password</label>
                                <input 
                                    className=''
                                    type='text'
                                    name="phone"
                                    // value={editData.phone}
                                    // onChange={handleChangeAdmin}
                                />
                            </div>
                            {/* <label>{store.errors.password}</label> */}
                        </div>
                        <div className='col-qv-4'>
                            <div className='input_area'>
                                <label>Owner Name</label>
                                <input 
                                    className=''
                                    type='text'
                                    name="phone"
                                    value={getEditMerchant.owner_name}
                                    // onChange={handleChangeAdmin}
                                />
                            </div>
                            {/* <label>{store.errors.password}</label> */}
                        </div>
                    </div>
                    <div className='qvrow'>
                        <div className='col-qv-6'>
                            <div className='input_area'>
                                <label>Account Type</label>
                                <select 
                                // value={adminId} 
                                // onChange={onChangeAdminId}
                                >
                                    {/* <option value="" >Select an Admin</option> */}
                                    <option>Live Account</option>
                                    <option>Sand box Account</option>
                                    {/* {
                                    adminList.map((option) =>
                                    {
                                    
                                    return  (
                                        <option></option>
                                    // <option key={option.id} value={option.merchant_id}>
                                    //     {option.name}
                                    // </option>
                                    )}
                                    )
                                    } */}
                                </select>
                            </div>
                            {/* {errorAdminId && <span>{errorAdminId}</span>} */}
                        </div>
                        <div className='col-qv-3'>
                            <div className='input_area'>
                                <label>Inventory Approval</label>
                                <input 
                                    className=''
                                    type='text'
                                    name="pin"
                                    // value={merchantStore.pin}
                                    // onChange={handleChangeMerchant}
                                />
                            </div>
                            {/* {errorPin && <span>{errorPin}</span>} */}
                        </div>
                        <div className='col-qv-3'>
                            <div className='input_area'>
                                <label>Current OTP</label>
                                <input 
                                    className=''
                                    type='text'
                                    name="pin"
                                    value={getEditMerchant.otp}
                                    // onChange={handleChangeMerchant}
                                />
                            </div>
                            {/* {errorPin && <span>{errorPin}</span>} */}
                        </div>
                    </div>
                    <div className='qvrow'>
                        <h3>Address</h3>
                        <div className='col-qv-6'>
                            <div className='input_area'>
                                <label>Address Line1</label>
                                <input 
                                    className=''
                                    type='text'
                                    name="owner_name"
                                    value={getEditMerchant.a_address_line_1}
                        
                                    // onChange={handleChangeAdmin}
                                />
                            </div>
                            
                        </div>
                        
                        <div className='col-qv-6'>
                            <div className='input_area'>
                                <label>Address Line2</label>
                                <input 
                                    className=''
                                    type='text'
                                    name="email"
                                    value={getEditMerchant.a_address_line_2}
                                    // onChange={handleChangeAdmin}
                                />
                            </div>
                            {/* <label>{store.errors.ownerName}</label> */}
                        </div>
                        <div className='col-qv-6'>
                            <div className='input_area'>
                                <label>Phone</label>
                                <input 
                                    className=''
                                    type='text'
                                    name="email"
                                    value={getEditMerchant.a_phone}
                                    // onChange={handleChangeAdmin}
                                />
                            </div>
                            {/* <label>{store.errors.ownerName}</label> */}
                        </div>
                        <div className='col-qv-6'>
                            <div className='input_area'>
                                <label>City</label>
                                <input 
                                    className=''
                                    type='text'
                                    name="email"
                                    value={getEditMerchant.a_city}
                                    // onChange={handleChangeAdmin}
                                />
                            </div>
                            {/* <label>{store.errors.ownerName}</label> */}
                        </div>
                        <div className='col-qv-6'>
                            <div className='input_area'>
                                <label>Zip Code</label>
                                <input 
                                    className=''
                                    type='text'
                                    name="email"
                                    value={getEditMerchant.a_zip}
                                    // onChange={handleChangeAdmin}
                                />
                            </div>
                            {/* <label>{store.errors.ownerName}</label> */}
                        </div>
                        <div className='col-qv-6'>
                            <div className='input_area'>
                                <label>State</label>
                                <select 
                                value={getEditMerchant.a_state} 
                                name="state"
                                // onChange={handleChange}
                                >
                                    <option value="" >Select States</option>
                                    {
                                    getEditMerchant.states.map((option,index) =>
                                    {
                                        return  (
                                        <option key={index} value={option.State}>
                                            {option.State}
                                        </option>
                                        )
                                    }
                                    )
                                    }
                                </select>

                            </div>
                            {/* <label>{store.errors.ownerName}</label> */}
                        </div>
                        <div className='col-qv-12'>
                            <div className='input_rediobutton_area'>
                                    <input
                                        className='inputredio'
                                        type="radio"
                                        id="radio1"
                                        name="radio" 
                                        value="1"
                                        onClick={handleChangePaymentMode}
                                    />
                                    <label htmlFor="radio1">CREDITS CARDS ONLY</label>
                            </div>
                            <div className='input_rediobutton_area'>
                                    <input
                                        className='inputredio'
                                        type="radio"
                                        id="radio2"
                                        name="radio"
                                        value="0" 
                                        onClick={handleChangePaymentMode}
                                        checked={paymentModeOffline}
                                    />
                                    <label htmlFor="radio2">CASH ONLY</label>
                            </div>
                            <div className='input_rediobutton_area'>
                                    <input
                                        className='inputredio'
                                        type="radio"
                                        id="radio3"
                                        name="radio"
                                        value="1" 
                                        onClick={handleChangePaymentMode}
                                        checked={paymentModeOnline}
                                    />
                                    <label htmlFor="radio3">CASH AND CREDITS CARDS ONLY</label>
                            </div>
                            {/* <label>{radioErros}</label> */}
                        </div>
                        {
                            paymentModeOnline ?
                            <div className='qvrow'>
                                <div className='col-qv-6'>
                                    <div className='input_area'>
                                        <label>API KEY</label>
                                        <input 
                                            className=''
                                            type='text'
                                            name="owner_name"
                                            value={getEditMerchant.merchant_token}
                                            // value={editData.owner_name}
                                
                                            // onChange={handleChangeAdmin}
                                        />
                                    </div>
                                    
                                </div>
                        
                                <div className='col-qv-6'>
                                    <div className='input_area'>
                                        <label>USA PIN</label>
                                        <input 
                                            className=''
                                            type='text'
                                            name="email"
                                            value={getEditMerchant.usa_pin}
                                            // onChange={handleChangeAdmin}
                                        />
                                    </div>
                                    {/* <label>{store.errors.ownerName}</label> */}
                                </div>
                            </div>

                            :''
                        }
                      
                    </div>
                
                
                    <input 
                        type='button'
                        className="blue_btn"
                        value="Submit"
                        // onClick={handleSubmitAdmin}
                    /> 
                </div>
                
        
        
        </div>
        
        
    </div>  
</div>
  )
}
