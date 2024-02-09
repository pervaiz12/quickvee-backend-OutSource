import React,{useState} from 'react'
import{BASE_URL,GET_EDIT_CUSTOMER} from '../../../Constants/Config'
import axios from 'axios'
export default function EditMerchantFunctionality() {
    const[getEditMerchant,setEditMerchant]=useState({username:'',name:'',merchant_id:'',owner_name:'',otp:'',a_address_line_1:'',a_address_line_2:'',a_phone:'',a_city:'',a_zip:'',a_state:'',merchant_token:'',usa_pin:'',states:[]})

    const[paymentModeOnline,setPaymentModeOnline]=useState(false)
    const[paymentModeOffline,setPaymentModeOffline]=useState(false)
    const[paymentModeRecord,setPaymentModeRecord]=useState([])
   
    const getEditMerchantData=async(data)=>{
        const dataNew={id:data}
            await axios.post(BASE_URL+GET_EDIT_CUSTOMER,dataNew,{headers:{
                "Content-Type":'multipart/form-data'
            }}).then(response=>{
                console.log(response.data.message)
                console.log(response.data.message.row)
                if(response.data.status==200)
                {
                    setEditMerchant({
                        username:response.data.message.row.email,
                        name:response.data.message.row.name,
                        merchant_id:response.data.message.row.merchant_id,
                        owner_name:response.data.message.row.owner_name,
                        otp:response.data.message.row.ver_code,
                        a_address_line_1:response.data.message.row.a_address_line_1,
                        a_address_line_2:response.data.message.row.a_address_line_2,
                        a_phone:response.data.message.row.phone,
                        a_city:response.data.message.row.a_city,
                        a_zip:response.data.message.row.a_zip,
                        a_state:response.data.message.row.a_state,
                        merchant_token:response.data.message.row.merchant_token,
                        usa_pin:response.data.message.row.usa_pin,
                        states:response.data.message.states,
                    })


                    if(response.data.message.Paymentmode !==null)
                    {
                        setPaymentModeRecord(response.data.message.Paymentmode.cc_payment)
                 
                    if(response.data.message.Paymentmode.cc_payment==2)
                    {
                        setPaymentModeOnline(true)
                        setPaymentModeOffline(false)

                    }else{
                        setPaymentModeOffline(true)
                        setPaymentModeOnline(false)

                    }

                    }
                    
                }
            })
        
    }
    

    const handleChangePaymentMode=(e)=>{
        // console.log(e.target.value)
        setPaymentModeRecord(e.target.value)
        if(e.target.value==1)
        {
            setPaymentModeOnline(true)
            setPaymentModeOffline(false)
        }else if(e.target.value==0){
            setPaymentModeOffline(true)
            setPaymentModeOnline(false)

        }


    }
    return {getEditMerchantData,getEditMerchant,handleChangePaymentMode,paymentModeOnline,paymentModeOffline
    ,paymentModeOnline,paymentModeOffline}
}
