import React,{useState} from 'react'
import{BASE_URL,GET_EDIT_CUSTOMER,GET_UPDATE_MERCHANT} from '../../../Constants/Config'
import axios from 'axios'
export default function EditMerchantFunctionality() {
    const[getEditMerchant,setEditMerchant]=useState({id:'',username:'',name:'',merchant_id:'',password:'',live_account:'',owner_name:'',otp:'',a_address_line_1:'',a_address_line_2:'',a_phone:'',a_city:'',a_zip:'',a_state:'',merchant_token:'',usa_pin:'',
    user_type:'',id:'',states:[]})

    const[paymentModeOnline,setPaymentModeOnline]=useState(false)
    const[paymentModeOffline,setPaymentModeOffline]=useState(false)
    const[paymentModeRecord,setPaymentModeRecord]=useState('')
   
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
                        id:data,
                        password:'',
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
                        user_type:response.data.message.row.user_type,
                        id:response.data.message.row.id,
                        states:response.data.message.states,
                    })
                    // console.log(response.data.message.Paymentmode.cc_payment)
                    if(response.data.message.Paymentmode==null)
                    {
                        setPaymentModeRecord('0')
                        setPaymentModeOffline(true)
                        setPaymentModeOnline(false)

                    }else if((response.data.message.Paymentmode.cc_payment ==null) || (response.data.message.Paymentmode.cc_payment==0  )){
                        setPaymentModeRecord(response.data.message.Paymentmode.cc_payment)
                        setPaymentModeOffline(true)
                        setPaymentModeOnline(false)

                    }else if((response.data.message.Paymentmode.cc_payment !==null)|| (response.data.message.Paymentmode.cc_payment==2))
                    {
                        setPaymentModeRecord(response.data.message.Paymentmode.cc_payment)
                        setPaymentModeOnline(true)
                        setPaymentModeOffline(false)

                    }
                    
                }
            })
        
    }

    const handleChangeMerchant=(e)=>{
        const {name,value}=e.target
        setEditMerchant((prev)=>({
            ...prev,
            [name]:value

        })
        );
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

    const handleUpdateMerchant=async(e)=>{
        e.preventDefault();
        const packet={id:getEditMerchant.id,owner_name:getEditMerchant.owner_name,username:getEditMerchant.username,user_type:getEditMerchant.user_type,mer_id:getEditMerchant.id,name:getEditMerchant.name,
            merchant_id:getEditMerchant.merchant_id,ownername:getEditMerchant.owner_name,password:getEditMerchant.password,address:{address1:getEditMerchant.a_address_line_1,address2:getEditMerchant.a_address_line_2,phoneNumber:getEditMerchant.a_phone,city:getEditMerchant.a_city,a_zip:getEditMerchant.a_zip,state:getEditMerchant.a_state},cc_payment:paymentModeRecord,account_type:0}
        console.log(packet)  
        try {
            let response=await axios.post(BASE_URL+GET_UPDATE_MERCHANT,packet,{headers:{
                "Content-Type":'multipart/form-data'
            }})
            console.log(response)
            
        } catch (e) {
           console.log('Exception',e)
        }

    }
    return {getEditMerchantData,getEditMerchant,handleChangePaymentMode,paymentModeOnline,paymentModeOffline
    ,paymentModeOnline,paymentModeOffline,handleUpdateMerchant,handleChangeMerchant}
}
