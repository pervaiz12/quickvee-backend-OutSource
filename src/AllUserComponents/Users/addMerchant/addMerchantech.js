import React from 'react'
import '../../../Styles/Common.css'
// import {Col, Form, Row } from 'react-bootstrap'../../Styles/Common.css
import MerchantFunction from './UserFunctionality/merchantFunction'
// import Form from 'react-bootstrap/Form';


export default function AddMerchan() {
    const{handleChange,store,handleSubmit,onClickUserRadio,userRadio,handleChangeMerchant,handleBlur
        ,merchantStore,radioErros,stateList,adminList,adminId,onChangeAdminId,handleSubmitMerchant,errorAdminId,errorPin
    ,handleKeyPress}= MerchantFunction()
    
     
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
                        
                    </div>
                    <span className='error'>{radioErros}</span>
                    <br/>
                    
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
                                    
                                    {store.errors.storename && <span className='error'>{store.errors.storename}</span>}
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
                                    <span className='error'>{store.errors.ownerName}</span>
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
                                            onBlur={() => handleBlur('email')}
                                        />
                                    </div>
                                    <span className='error'>{store.errors.email}</span>
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
                                            onBlur={() => handleBlur('password')}
                                        
                                        />
                                    </div>
                                    <span className='error'>{store.errors.password}</span>
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
                                            maxLength={10}
                                            onKeyPress={handleKeyPress}
                                            // placeholder='First Name'
                                        />
                                    </div>
                                    <span className='error'>{store.errors.phone}</span>
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
                                    <label className='error'>{store.errors.state}</label>
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
                                    {errorAdminId && <span className='error'>{errorAdminId}</span>}
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
                                            maxLength={4}
                                            onKeyPress={handleKeyPress}
                                        />
                                    </div>
                                    {errorPin && <span className='error'>{errorPin}</span>}
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
                                            value={store.storename}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {store.errors.storename && <span className='error'>{store.errors.storename}</span>}
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
                                    <span className='error'>{store.errors.ownerName}</span>
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
                                            value={store.email}
                                            onChange={handleChange}
                                           
                                            onBlur={() => handleBlur('email')}
                                            
                                        />
                                    </div>
                                    <span className='error'>{store.errors.email}</span>
                                </div>
                                <div className='col-qv-6'>
                                    <div className='input_area'>
                                        <label>Password</label>
                                        <input 
                                            className=''
                                            type='text'
                                            name="password"
                                            value={store.password}
                                            onChange={handleChange}
                                           
                                            onBlur={() => handleBlur('password')}
                                            // value={merchantStore.mer_password}
                                            // onChange={handleChangeMerchant}
                                        />
                                    </div>
                                    <span className='error'>{store.errors.password}</span>
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
                                            maxLength={10}
                                            onKeyPress={handleKeyPress}
                                            // value={merchantStore.mer_phone}
                                            // onChange={handleChangeMerchant}
                                        />
                                    </div>
                                    <span className='error'>{store.errors.phone}</span>
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
                                    <span className='error'>{store.errors.state}</span>
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

