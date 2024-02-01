import React from 'react'
import '../../Styles/Common.css'
// import {Col, Form, Row } from 'react-bootstrap'
import MerchantFunction from './UserFunctionality/merchantFunction'
// import Form from 'react-bootstrap/Form';


export default function AddMerchan() {
    const{handleChange,store,handleSubmit,onClickUserRadio,userRadio,handleChangeMerchant
        ,merchantStore,radioErros,stateList,adminList,adminId,onChangeAdminId,handleSubmitMerchant,errorAdminId,errorPin}= MerchantFunction()
    
     
  return (
    <>
        <div className='box'>
            <div className='box_shadow_div'>
                <div className='pd_20'>
                    <h1 className='heading'>User Type</h1>
                   
                    <div className='col-qv-3'>
                        <div className='input_rediobutton_area'>
                                <input
                                    className='inputredio'
                                    type="radio"
                                    id="radio2"
                                    name="radio" 
                                    value="admin"
                                    onClick={onClickUserRadio}
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
                                    onClick={onClickUserRadio}
                                />
                                <label htmlFor="radio1">Merchant</label>
                        </div>
                        <label>{radioErros}</label>
                    </div>
                    {/*  */}
                    {
                        !userRadio ? 
                        <div>
                            <div className='qvrow'>
                                <div className='col-qv-6'>
                                    <div className='input_area'>
                                        <label>Store Name</label>
                                        <input 
                                            className=''
                                            type='text'
                                            name="storename"
                                            value={store.storename}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/* <label>{store.errors.storename  ? store.errors.storename:''}</label> */}
                                    {store.errors.storename && <span>{store.errors.storename}</span>}
                                </div>
                                
                                <div className='col-qv-6'>
                                    <div className='input_area'>
                                        <label>Owner Name</label>
                                        <input 
                                            className=''
                                            type='text'
                                            name="ownerName"
                                            value={store.ownerName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <label>{store.errors.ownerName}</label>
                                </div>
                            </div>
                            <div className='qvrow'>
                                <div className='col-qv-6'>
                                    <div className='input_area'>
                                        <label>Email</label>
                                        <input 
                                            className=''
                                            type='text'
                                            name="email"
                                            onChange={handleChange}
                                            value={store.email}
                                        />
                                    </div>
                                    <label>{store.errors.email}</label>
                                </div>
                                <div className='col-qv-6'>
                                    <div className='input_area'>
                                        <label>password</label>
                                        <input 
                                            className=''
                                            type='text'
                                            name="password"
                                            onChange={handleChange}
                                            value={store.password}
                                        
                                        />
                                    </div>
                                    <label>{store.errors.password}</label>
                                </div>
                            </div>
                            <div className='qvrow'>
                                <div className='col-qv-6'>
                                    <div className='input_area'>
                                        <label>Phone</label>
                                        <input 
                                            className=''
                                            type='text'
                                            name="phone"
                                            onChange={handleChange}
                                            value={store.phone}
                                            // placeholder='First Name'
                                        />
                                    </div>
                                    {/* <label>{store.errors.phone}</label> */}
                                </div>
                                <div className='col-qv-6'>
                                    <div className='input_area'>
                                        <label>State</label>
                                        <select 
                                        value={store.state} 
                                        name="state"
                                        onChange={handleChange}
                                        >
                                            <option value="" >Select States</option>
                                            {
                                            stateList.map((option) =>
                                            {
                                            //     console.log(option)
                                            // }
                                            return  (
                                            <option key={option.State} value={option.State}>
                                                {option.State}
                                            </option>
                                            )}
                                            )
                                            }
                                        </select>

                                    </div>
                                    <label>{store.errors.state}</label>
                                </div>
                            </div>
                            <input 
                                type='button'
                                className="blue_btn"
                                value="Submit"
                                onClick={handleSubmit}
                            /> 
                        </div>
                        :
                        <>
                            <div className='qvrow'>
                                <div className='col-qv-6'>
                                    <div className='input_area'>
                                        <label>Select Admin</label>
                                        <select 
                                        value={adminId} 
                                        onChange={onChangeAdminId}
                                        >
                                            <option value="" >Select an Admin</option>
                                            {
                                            adminList.map((option) =>
                                            {
                                            
                                            return  (
                                            <option key={option.id} value={option.merchant_id}>
                                                {option.name}
                                            </option>
                                            )}
                                            )
                                            }
                                        </select>
                                    </div>
                                    {errorAdminId && <span>{errorAdminId}</span>}
                                </div>
                                <div className='col-qv-6'>
                                    <div className='input_area'>
                                        <label>Login Pin</label>
                                        <input 
                                            className=''
                                            type='text'
                                            name="pin"
                                            value={merchantStore.pin}
                                            onChange={handleChangeMerchant}
                                        />
                                    </div>
                                    {errorPin && <span>{errorPin}</span>}
                                </div>
                            </div>
                            <div className='qvrow'>
                                <div className='col-qv-6'>
                                    <div className='input_area'>
                                        <label>Store Name</label>
                                        <input 
                                            className=''
                                            type='text'
                                            name="storename"
                                            // value={merchantStore.mer_store_name}
                                            // onChange={handleChangeMerchant}
                                            value={store.storename}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {store.errors.storename && <span>{store.errors.storename}</span>}
                                </div>
                                <div className='col-qv-6'>
                                    <div className='input_area'>
                                        <label>Owner Name</label>
                                        <input 
                                            className=''
                                            type='text'
                                            name="ownerName"
                                            // value={merchantStore.mer_owner_name}
                                            // onChange={handleChangeMerchant}
                                            value={store.ownerName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <label>{store.errors.ownerName}</label>
                                </div>
                            </div>
                            <div className='qvrow'>
                                <div className='col-qv-6'>
                                    <div className='input_area'>
                                        <label>Email</label>
                                        <input 
                                            className=''
                                            type='text'
                                            name="email"
                                            onChange={handleChange}
                                            value={store.email}
                                            // value={merchantStore.mer_email}
                                            // onChange={handleChangeMerchant}
                                        />
                                    </div>
                                    <label>{store.errors.email}</label>
                                </div>
                                <div className='col-qv-6'>
                                    <div className='input_area'>
                                        <label>Password</label>
                                        <input 
                                            className=''
                                            type='text'
                                            name="password"
                                            onChange={handleChange}
                                            value={store.password}
                                            // value={merchantStore.mer_password}
                                            // onChange={handleChangeMerchant}
                                        />
                                    </div>
                                    <label>{store.errors.password}</label>
                                </div>
                                <div className='col-qv-6'>
                                    <div className='input_area'>
                                        <label>Phone</label>
                                        <input 
                                            className=''
                                            type='text'
                                            name="phone"
                                            onChange={handleChange}
                                            value={store.phone}
                                            // value={merchantStore.mer_phone}
                                            // onChange={handleChangeMerchant}
                                        />
                                    </div>
                                </div>
                                <div className='col-qv-6'>
                                    <div className='input_area'>
                                        <label>State</label>
                                        <select 
                                            value={store.state} 
                                            name="state"
                                            onChange={handleChange}
                                        >
                                            <option value="" >Select States</option>
                                            {
                                            stateList.map((option) =>
                                            {
                                            //     console.log(option)
                                            // }
                                            return  (
                                            <option key={option.State} value={option.State}>
                                                {option.State}
                                            </option>
                                            )}
                                            )
                                            }
                                        </select>
                                    </div>
                                    <label>{store.errors.state}</label>
                                </div>
                                <input 
                                    type='button'
                                    className="blue_btn"
                                    value="Submit"
                                    onClick={handleSubmitMerchant}
                                />
                            </div>
                            {/* <input 
                                type='button'
                                className="blue_btn"
                                value="Submit"
                                onClick={handleSubmit}
                            /> */}
                        </>
                    }
                  
                </div>
                
                
            </div>  
                

        </div>
      
    </>
  )
}

