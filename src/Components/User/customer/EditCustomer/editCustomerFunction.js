import axios from 'axios'
import React,{useState,useEffect}  from 'react'
import{BASE_URL,GET_EDIT_CUSTOMER,GET_UPDATE_CUSTOMER}from '../../../../Constants/Config'
import { useNavigate } from 'react-router-dom';


const EditCustomerFunction=()=>{
    const navigate = useNavigate();
    const [customerData, setCustomerData] = useState({
        name: '',
        email: '',
        reSet: '',
        phone: '',
        id: '',
        user_type: '',
        password:'',
      });
      
    const[customerRadio,setCustomerRadio]=useState(false)
    const[AdminRadio,setAdminRadio]=useState(false)
    const[merchantRadio,setMerchantRadio]=useState(false)
    const[storeRadio,setStoreRadio]=useState('')
    const[successMessage,setSuccessMessage]=useState('')

    const handleEditData=async(data)=>
    {
        // console.log(data)
        const dataNew={id:data}
            await axios.post(BASE_URL+GET_EDIT_CUSTOMER,dataNew,{headers:{
                "Content-Type":'multipart/form-data'
            }}).then(response=>{
                console.log(response.data.status)
                console.log(response.data.message.row)
                if(response.data.status==200)
                {
                    setCustomerData(response.data.message.row)
                    // console.log(response.data.message.user_type)
                    
                    if(response.data.message.row.user_type.toLowerCase()=="customer")
                    {
                        setStoreRadio(response.data.message.row.user_type)
                        setCustomerRadio(true)

                    }else if(response.data.message.row.user_type.toLowerCase()=="admin")
                    {
                        setStoreRadio(response.data.message.row.user_type)
                        setAdminRadio(true)

                    }else if(response.data.message.user_type.toLowerCase()=="merchant"){
                        setStoreRadio(response.data.message.row.user_type)
                        setMerchantRadio(true)

                    }
                    
                }
              
            })
    }
    const handleChange=(e)=>{
        const{name,value}=e.target
        setCustomerData({
            ...customerData,
            [name]:value

        })
        
    }
    const handleChangeRadio=(e)=>{
        console.log(e.target.value)
        if(e.target.value=='merchant')
        {
            setMerchantRadio(true)
            setAdminRadio(false)
            setCustomerRadio(false)

        }else if(e.target.value=='admin'){
            setAdminRadio(true)
            setMerchantRadio(false)
            setCustomerRadio(false)

        }else if(e.target.value=="customer"){
            setCustomerRadio(true)
            setMerchantRadio(false)
            setAdminRadio(false)
        }
        setStoreRadio(e.target.value)
    }
    const handleSubmitCustomerRecord=async(e)=>{
        e.preventDefault();
        // console.log('hello customer')
        // customerData.password,owner_name:customerData.name
        const data={id:customerData.id,user_type:storeRadio,name:customerData.name,phone:customerData.phone,password:''}
        await axios.post(BASE_URL+GET_UPDATE_CUSTOMER,data,{headers:{
            "Content-Type":'multipart/form-data'
        }}).then(response=>{
            if(response.data.status==200)
            {
                console.log(response.data.message)
                setSuccessMessage(response.data.message)
                // if(response.data.record.user_type=='admin')
                // {
                //     console.log(response.data)
                   
                //     // navigate(`/user/editAdmin/${customerData.id}`)
                // }
                // // setSuccessMessage(response.data.message)

            }
        })
       

    }
    return {handleEditData,customerData,handleChange,customerRadio,AdminRadio,merchantRadio,handleChangeRadio,handleSubmitCustomerRecord,successMessage}

}
export default EditCustomerFunction