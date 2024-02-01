import React from 'react'

export default function EditMerchant() {
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
                                    // value={editData.email}
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
                                    // value={editData.password}
                                    // onChange={handleChangeAdmin}
                                    // value={store.email}
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
                                    // value={editData.phone}
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
                                    // value={merchantStore.pin}
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
                                    // value={editData.owner_name}
                        
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
                                    // value={editData.email}
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
                                    // value={editData.email}
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
                                    // value={editData.email}
                                    // onChange={handleChangeAdmin}
                                />
                            </div>
                            {/* <label>{store.errors.ownerName}</label> */}
                        </div>
                        <div className='col-qv-6'>
                            <div className='input_area'>
                                <label>State</label>
                                <input 
                                    className=''
                                    type='text'
                                    name="email"
                                    // value={editData.email}
                                    // onChange={handleChangeAdmin}
                                />
                            </div>
                            {/* <label>{store.errors.ownerName}</label> */}
                        </div>
                        <div className='col-qv-6'>
                            <div className='input_area'>
                                <label>Zip</label>
                                <input 
                                    className=''
                                    type='text'
                                    name="email"
                                    // value={editData.email}
                                    // onChange={handleChangeAdmin}
                                />
                            </div>
                            {/* <label>{store.errors.ownerName}</label> */}
                        </div>
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
