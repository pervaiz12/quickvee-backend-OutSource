import React,{useEffect} from 'react'
import {
    useParams,
  } from "react-router-dom";
  import EditAdminFunctionality from './editAdminFunctionality'
  import { useAuthDetails } from '../../../../Common/cookiesHelper';

export default function EditAdmin() {
    const{handleEditAdmin,editData,handleChangeAdmin,handleSubmitAdmin,errors,handleKeyPress}=EditAdminFunctionality()
    const {LoginGetDashBoardRecordJson,LoginAllStore,userTypeData} = useAuthDetails();

    const  {id}  = useParams();
    // console.log(id)
    
    useEffect(()=>{
        // console.log(id)
        handleEditAdmin({admin_id:id,...userTypeData})

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
                                    <label className='error'>{errors.owner_name}</label>
                                </div>
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
                                    <label className='error'>{errors.email}</label>
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
                                        name="password1"
                                        value={editData.password1}
                                        onChange={handleChangeAdmin}
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
                                        onChange={handleChangeAdmin}
                                    />
                                    <label className='error'>{errors.phone}</label>
                                </div>
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
