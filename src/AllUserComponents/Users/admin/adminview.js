import React,{useState,useEffect} from 'react'
import {AdminFunction} from '../../../Redux/features/user/adminSlice'

import { useSelector, useDispatch } from 'react-redux';
import AdminFunctionality from './adminFunctionality'
import ViewAdmin from './viewAdminModal'
import { useNavigate } from 'react-router-dom';

import {Link} from 'react-router-dom'

export default function AdminView() {
    const navigate = useNavigate();
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
// ---------------------------
const [selectedAction, setSelectedAction] = useState('');
const [searchRecord,setSearchRecord]=useState('')

  // const handleSelectChange = (e) => {
  //   const selectedUrl = e.target.value;
  //   const urlParts = selectedUrl.split('/');
  //   const url=window.location.href
    
  //   if(urlParts[2]=="editAdmin"){
      
  //     navigate(`${selectedUrl}`);
     
  //   }else {
  //     console.log('hello delet')
  //   }
  // };

// ---------------------------
const handleSearchInputChange=(e)=>{
  setSearchRecord(e.target.value)
}
const filteredAdminRecord = AdminRecord && AdminRecord.AdminRecord && Array.isArray(AdminRecord.AdminRecord) 
? AdminRecord.AdminRecord.filter(result =>
    (result.owner_name && result.owner_name.toLowerCase().includes(searchRecord.toLowerCase())) ||
    (result.email && result.email.toLowerCase().includes(searchRecord.toLowerCase())) ||
    (result.phone && result.phone.includes(searchRecord))
  )
: [];


  return (
    <>
   
   <div className='box'>
      <div className='box_shadow_div'>
        <div className='qvrow'>
          <div className='col-qv-8'>
            <div className='btn-area'>
              <Link to="/users/addAdmin" className='blue_btn'>ADD</Link>
            </div>
          </div>
          <div className='col-qv-4'>
            <div className='seacrh_area'>
            <div className="input_area">
              <input className="" type="text" value={searchRecord}
               onInput={handleSearchInputChange}
               placeholder="Search..."
               autoComplete="off"
               />
            </div>
            </div>
          </div>
        </div>
        <div className='table_main_area'>
          <div className='table_header_sticky'>
              {/* <div className='table_header_top'>
              <h1>Table Area</h1>
              </div> */}
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
                  // Array.isArray(AdminRecord && AdminRecord.AdminRecord) ?AdminRecord.AdminRecord.map(result=>{
                    Array.isArray(AdminRecord && AdminRecord.AdminRecord) ? filteredAdminRecord.map(result=>{
                     
                      return(
                          
                              <div className='table_row' key={result.id}>
                                  <p className='table20 txt_ellipsis'>{result.owner_name}</p>
                                  <p className='table20 txt_ellipsis'>{result.name}</p>
                                  <p className='table20 txt_ellipsis'>{result.email}</p>
                                  <p className='table20'>{result.phone}</p>
                                  <p className='table15'onClick={()=>handleViewAdmin(result.email)}>view merchant</p>
                                  <div className='table5' >
                                  {/* <select
                                      value={selectedAction}
                                      onChange={handleSelectChange}
                                      >
                                      <option  value="" disabled hidden></option>
                                      <option value={`/users/editAdmin/${result.id}`}>Edit</option> */}
                                      {/* <option value={result.id}>Delete</option> */}
                                  {/* </select> */}
                                <div className='verifiedTableIcon'><Link to={`/users/editAdmin/${result.id}`}><img src="/static/media/editIcon.4dccb72a9324ddcac62b9a41d0a042db.svg"></img></Link> </div>
                                  
                                  </div>
                              </div>
              
                              
                          )
                  }):[]
              }
          </div>
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
