import React,{useState,useEffect} from 'react'
import {GET_ADMIN_MERCHANT,BASE_URL} from '../../../Constants/Config'
import axios from 'axios';


export default function AdminFunctionality() {
    const[showAdmin,setShowAdmin]=useState(false)
    const[showMerchantData,setShowMerchantData]=useState([])

    const handleViewAdmin=async(data)=>{
        // "kaushal123@imerchantech.com"
        const datarecord={email:data}
        await axios.post(BASE_URL+GET_ADMIN_MERCHANT,datarecord,{ headers: { "Content-Type": "multipart/form-data" }}).then(response=>{
            if(response.data.status==200)
            {
                // console.log(response.data.message)
                setShowMerchantData(response.data.message)
                setShowAdmin(true)
                // console.log('yessss')
            }
            else{
                setShowMerchantData(response.data.message)
                setShowAdmin(true)
            }
        })
        
        // console.log('HELLE')
        // console.log(data)

        // const dataArray = data.split(',');
        // setShowAdmin(true)
        // const jsonString = JSON.stringify(dataArray);
        // console.log(jsonString)
        //  console.log(Array.isArray(dataArray))
        //  if(Array.isArray(dataArray))
        //  {
        //     dataArray.map(async(result)=>{
        //         const data={merchant_id:result}
        //         await axios.post(BASE_URL+GET_MANAGER_MERCHANT,data,{ headers: { "Content-Type": "multipart/form-data" }}).then(result=>{
        //             if(result.data.status==200)
        //             {
        //                 setShowMerchantData(result.data.message)
        //                 setShowMerchant(true)

        //             }
                    
        //         })
                
        //     })

        //  }
         
    }
    const handleCloseAdminModel=()=>{
        // setShowMerchant([])
        setShowAdmin(false)
        
    }
// setShowMerchant,showMerchant,,showMerchantData

    return {handleCloseAdminModel,handleViewAdmin,showAdmin,showMerchantData}
   
}
