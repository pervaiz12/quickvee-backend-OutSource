import React,{useEffect} from 'react'
import {
    useParams,
  } from "react-router-dom";
  import EditAdminFunctionality from './editAdminFunctionality'
export default function EditAdmin() {
    const{handleEditAdmin,editData,handleChangeAdmin,handleSubmitAdmin,errors,handleKeyPress}=EditAdminFunctionality()
    const  {id}  = useParams();
    // console.log(id)
    
    useEffect(()=>{
        // console.log(id)
        handleEditAdmin(id)

    },[id])
  return (
    <div className='box'>
        <div className='box_shadow_div'>
            <div className='pd_20'>
                <h1 className='heading'>Edit Admin</h1>
                    <div>
                        <div className='qvrow'>
                            <div className='col-qv-6'>
                                <div className='input_area'>
                                    <label>Owner Name</label>
                                    <input 
                                        className=''
                                        type='text'
                                        name="owner_name"
                                        value={editData.owner_name}
                                        // value={customerData && customerData.name}value={editData.owner_name}
                                        onChange={handleChangeAdmin}
                                    />
                                </div>
                                <label>{errors.owner_name}</label>
                                {/* <label>{errors.owner_name}</label> */}
                                
                            </div>
                            
                            <div className='col-qv-6'>
                                <div className='input_area'>
                                    <label>Email</label>
                                    <input 
                                        className=''
                                        type='text'
                                        name="email"
                                        value={editData.email}
                                        // value={customerData && customerData.email}
                                        // value={store.ownerName}
                                        onChange={handleChangeAdmin}
                                    />
                                </div>
                                
                            </div>
                        </div>
                        <div className='qvrow'>
                            <div className='col-qv-6'>
                                <div className='input_area'>
                                    <label>Password</label>
                                    <input 
                                        className=''
                                        type='text'
                                        name="password"
                                        // value={editData.password}
                                        // onChange={handleChangeAdmin}
                                        // value={store.email}
                                    />
                                </div>
                                
                            </div>
                            <div className='col-qv-6'>
                                <div className='input_area'>
                                    <label>Phone</label>
                                    <input 
                                        className=''
                                        type='text'
                                        name="phone"
                                        value={editData.phone}
                                        onKeyPress={handleKeyPress}
                                        maxLength={10}
                                        // value={customerData && customerData.phone}
                                        onChange={handleChangeAdmin}
                                    />
                                </div>
                                <label>{errors.phone}</label>
                            </div>
                        </div>
                    
                    
                        <input 
                            type='button'
                            className="blue_btn"
                            value="Submit"
                            onClick={handleSubmitAdmin}
                        /> 
                    </div>
                    
            
            
            </div>
            
            
        </div>  
    </div>
  )
}
