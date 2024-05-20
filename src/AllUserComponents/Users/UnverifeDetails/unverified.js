import React,{useEffect,useState} from 'react'
import{getUnVerifiedMerchant,handleMoveDash} from '../../../Redux/features/user/unverifiedMerchantSlice'
import {getAuthInvalidMessage} from '../../../Redux/features/Authentication/loginSlice'
import { useSelector, useDispatch } from 'react-redux'
import{Link,useNavigate} from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Cookies from 'js-cookie'; 
import CryptoJS from 'crypto-js'; 
import { useAuthDetails } from '../../../Common/cookiesHelper';

export default function Unverified() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {LoginGetDashBoardRecordJson,LoginAllStore,userTypeData} = useAuthDetails();


  const merchant_id=LoginGetDashBoardRecordJson?.data?.merchant_id



  // =======================
  const UnVerifiedMerchantList = useSelector(
    (state) =>state.unverifiedMerchantRecord.unverifiedMerchantData,
  );

  // const data={type:'unapprove',token, token_id,login_type}
  useEffect(()=>{
      dispatch(getUnVerifiedMerchant({type:'unapprove',...userTypeData}))

  },[])
   // ====================================
   const [searchRecord,setSearchRecord]=useState('')


   const handleSearchInputChange=(e)=>{
     setSearchRecord(e.target.value)
   }
   const filteredAdminRecord = UnVerifiedMerchantList &&  Array.isArray(UnVerifiedMerchantList)
   ? UnVerifiedMerchantList.filter(result =>
      (result.owner_name && result.owner_name.toLowerCase().includes(searchRecord.toLowerCase()))||(result.name && result.name.toLowerCase().includes(searchRecord.toLowerCase())) ||
       (result.email && result.email.toLowerCase().includes(searchRecord.toLowerCase())) ||
       (result.phone && result.phone.includes(searchRecord))|| (result.a_state && result.a_state.includes(searchRecord))
     )
   : [];
   // ====================================
    // ====================================
    const handleEditMerchant = (data) => {
      
      navigate(`/users/editMerchant/${data}`);
    };
    const handleGetVerifiedMerchant=(merchant_id)=>{
      let data = {
        merchant_id: merchant_id,
        ...userTypeData
      };
      // const formdata = new FormData();
   
      dispatch(handleMoveDash(data)).then(result=>{
        // console.log(result?.payload)
        if(result?.payload?.status==true)
          {
            
            if(result?.payload?.final_login==1)
              {
                navigate(`/`)
              }else{
                console.log("store page called")
              }
     
          }else{
            console.log("hhhhhh")
              Cookies.remove('loginDetails');
              Cookies.remove('user_auth_record');
              // Cookies.remove('token_data');
              dispatch(getAuthInvalidMessage(result?.payload?.msg))
              navigate('/login')
    
          }
    })
  }
  
    //  ====================================
  return (
    <div className='q-order-main-page'>
    <div className='box'>
      <div className='box_shadow_div'>
      <div className='qvrow'>
            <div className='col-qv-8'>
              <div className='btn-area'>
                <Link to="/users/addMerchant"className='blue_btn'>ADD</Link>
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
          <div className='table_header_top'>
            {/* <h1>Table Area</h1> */}
          </div>
          <div className='table_header'>
            <p className='table15'>Owner Name</p>
            <p className='table15'>Name</p>
            <p className='table25'>Email</p>
            <p className='table10'>Phone</p>
            <p className='table10'>State</p>
            {/* <p className='table5'>Payment Mode</p> */}
            <p className='table10'>Merchant ID</p>
            <p className='table5'>OTP</p>
            <p className='table10'>Action</p>
          </div>
        </div>
          <div className='table_body'>
            {
              Array.isArray(UnVerifiedMerchantList) && UnVerifiedMerchantList && filteredAdminRecord.map((result,index)=>{
                // console.log(result)
                return(
                  <div className='table_row' key={index}>
                    <p className='table15'>{result.owner_name}</p>
                    <p className='table15'>{result.name}</p>
                    <p className='table25'>{result.email}</p>
                    <p className='table10'>{result.a_phone}</p>
                    <p className='table10'>{result.a_state}</p>
                    {/* <p className='table5'>{result.phone}</p> */}
                    <p className='table10'>{result.merchant_id}</p>
                    <p className='table5'>{result.ver_code}</p>
                    <div className='table10'><div className='verifiedTableIcon'>
                      {/* <div 
                    // to={`/users/editMerchant/${result.id}`}
                    onClick={()=>handleEditMerchant(result.id)}
                    ><img src="/static/media/editIcon.4dccb72a9324ddcac62b9a41d0a042db.svg"></img></div> */}
                     {/* <Link><img src="/static/media/deleteIcon.69bc427992d4100eeff181e798ba9283.svg"></img></Link> */}
                     </div>
                     <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Action</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={""}
          label="Age"
          onChange={""}
        >
          <MenuItem value={10} onClick={()=>handleGetVerifiedMerchant(result.merchant_id)}>view</MenuItem>
          <MenuItem value={20}><div 
                    // to={`/users/editMerchant/${result.id}`}
                    onClick={()=>handleEditMerchant(result.id)}
                    ><img src="/static/media/editIcon.4dccb72a9324ddcac62b9a41d0a042db.svg"></img></div></MenuItem>
          <MenuItem value={30}><Link><img src="/static/media/deleteIcon.69bc427992d4100eeff181e798ba9283.svg"></img></Link></MenuItem>
        </Select>
      </FormControl>
                    </div>
                  </div>

                )
                
              })

            } 
          </div>
      </div>
      </div>
    </div>
    </div>
  )
}
