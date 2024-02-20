import React,{useEffect} from 'react'
import{getUnVerifiedMerchant} from '../../../Redux/features/user/unverifiedMerchantSlice'
import { useSelector, useDispatch } from 'react-redux'
import{Link} from "react-router-dom"
export default function Unverified() {
  const dispatch = useDispatch()
  const UnVerifiedMerchantList = useSelector(
    (state) =>state.unverifiedMerchantRecord.unverifiedMerchantData,
  );
  const data={type:'unapprove'}
  useEffect(()=>{
      dispatch(getUnVerifiedMerchant(data))

  },[])
  return (
    <div className='box'>
      <div className='box_shadow_div'>
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
            <p className='table5'>Action</p>
          </div>
        </div>
          <div className='table_body'>
            {
              Array.isArray(UnVerifiedMerchantList) && UnVerifiedMerchantList && UnVerifiedMerchantList.map((result,index)=>{
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
                    <div className='table5'><div className='verifiedTableIcon'><Link to={`/users/editMerchant/${result.id}`}><img src="/static/media/editIcon.4dccb72a9324ddcac62b9a41d0a042db.svg"></img></Link> <Link><img src="/static/media/deleteIcon.69bc427992d4100eeff181e798ba9283.svg"></img></Link></div>
                    </div>
                  </div>

                )
                
              })

            } 
          </div>
      </div>
      </div>
    </div>
  )
}
