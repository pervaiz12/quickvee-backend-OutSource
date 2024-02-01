import axios from 'axios'
import React,{useState,useEffect}  from 'react'
import{BASE_URL,GET_EDIT_ADMIN,UPDATE_ADMIN_RECORD}from '../../../../Constants/Config'
import { useNavigate } from 'react-router-dom';

const EditAdminFunctionality=()=>{
    const navigate = useNavigate();
    const[editData,setEditData]=useState({owner_name:'',email:'',password:'',phone:'',password:''})

    const handleEditAdmin=async(data)=>{
        
        const dataNew={admin_id:data}
        // console.log(dataNew)
        await axios.post(BASE_URL+GET_EDIT_ADMIN,dataNew,{headers:{
            "Content-Type":'multipart/form-data'
          }}).then(response=>{
            if(response.data.status==200)
            {
              //  console.log(response.data.message[0])
                setEditData(response.data.message[0])

            }

          }
           
          )
    }
    const handleChangeAdmin=(e)=>{
        const{name,value}=e.target
        setEditData({...editData,[name]:value})
        

    }
    const handleSubmitAdmin=async(e)=>{
        const data={admin_id:editData.id,name:editData.owner_name,owner_name:editData.owner_name,password:editData.password,phone:editData.phone,email:editData.email}
        // console.log(data)

        await axios.post(BASE_URL+UPDATE_ADMIN_RECORD,data,{headers:{
            "Content-Type":'multipart/form-data'
          }}).then(result=>{
            setEditData({owner_name:'',email:'',password:'',phone:'',password:''})
            navigate('/user/adminview')
          })

    }
    return{handleEditAdmin,editData,handleChangeAdmin,handleSubmitAdmin}

}
export default EditAdminFunctionality