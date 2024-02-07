import React,{useState,useEffect} from 'react'
import {GET_MANAGER_MERCHANT,BASE_URL} from '../../../Constants/Config'
import axios from 'axios';


export default function ManagerFunctionality() {
    const[showMerchant,setShowMerchant]=useState(false)
    const[showMerchantData,setShowMerchantData]=useState([])

    // const handleViewMerchant=(data)=>{
    //     // console.log('hello')
    //     const dataArray = data.split(',');
    //     const sports=[];
    //     // console.log(dataArray)
        
    //      if(Array.isArray(dataArray))
    //      {
           
    //         dataArray.map(async(result)=>{
    //             const data={merchant_id:result}
                
    //             await axios.post(BASE_URL+GET_MANAGER_MERCHANT,data,{ headers: { "Content-Type": "multipart/form-data" }}).then(result=>{
    //                 // console.log('hello')
    //                 // console.log(result.data.message[0].name)

    //                 if(result.data.status==200)
    //                 {
    //                     // console.log(result.data.message)
    //                     sports.push(result.data.message[0])
    //                     setShowMerchantData(result.data.message)
    //                     setShowMerchant(true)

    //                 }
                    
    //             })
                
    //         })
            

    //      }
    //      console.log(sports)
         
    // }
    const handleViewMerchant = async (data) => {
        const dataArray = data.split(',');
        const sports = [];
        // console.log(dataArray)
    
        if (Array.isArray(dataArray)) {
            try {
                
                await Promise.all(dataArray.map(async (result) => {
                    const postData = { merchant_id: result };
                    const response = await axios.post(BASE_URL + GET_MANAGER_MERCHANT, postData, { headers: { "Content-Type": "multipart/form-data" } });
    
                    if (response.data.status === 200) {
                        sports.push(response.data.message[0]);
                      
                    }
                }));
    
                // console.log('hello')
                setShowMerchantData(sports);
                setShowMerchant(true);
            } catch (error) {
                console.error("Error fetching data:", error);
               
            }
        }
    };
    const handleCloseMerchantModel=()=>{
        setShowMerchant([])
        setShowMerchant(false)
        
    }


    return {setShowMerchant,showMerchant,handleViewMerchant,handleCloseMerchantModel,showMerchantData}
   
}
