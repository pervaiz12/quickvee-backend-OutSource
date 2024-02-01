import React,{useState,useEffect} from 'react'
import {GET_MANAGER_MERCHANT,BASE_URL} from '../../../Constants/Config'
import axios from 'axios';


export default function ManagerFunctionality() {
    const[showMerchant,setShowMerchant]=useState(false)
    const[showMerchantData,setShowMerchantData]=useState([])

    const handleViewMerchant=(data)=>{
        // console.log(data)
        const dataArray = data.split(',');
        // const jsonString = JSON.stringify(dataArray);
        // console.log(jsonString)
        //  console.log(Array.isArray(dataArray))
         if(Array.isArray(dataArray))
         {
            dataArray.map(async(result)=>{
                const data={merchant_id:result}
                await axios.post(BASE_URL+GET_MANAGER_MERCHANT,data,{ headers: { "Content-Type": "multipart/form-data" }}).then(result=>{
                    if(result.data.status==200)
                    {
                        setShowMerchantData(result.data.message)
                        setShowMerchant(true)

                    }
                    
                })
                
            })

         }
         
    }
    const handleCloseMerchantModel=()=>{
        setShowMerchant([])
        setShowMerchant(false)
        
    }


    return {setShowMerchant,showMerchant,handleViewMerchant,handleCloseMerchantModel,showMerchantData}
   
}
