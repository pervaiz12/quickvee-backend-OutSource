// import react from 'react'
import react, {useState,useEffect} from 'react'
import axios from 'axios'
import {BASE_URL,ADD_MERCHAN_EMPLOYEE,GET_MERCHAN_STATE,GET_ADMIN_DATA,ADMIN_CHECK_USER}
 from '../../../../Constants/Config'
 import { useNavigate } from 'react-router-dom';

const MerchantFunction=()=>{
     const navigate = useNavigate();
    
    const [store,setStore]=useState({
        storename:'',
        ownerName:'',
        email:'',
        password:'',
        phone:'',
        state:'',
        errors:{
            storename:'',
            ownerName:'',
            email:'',
            password:'',
            phone:'',
            state:'',
        }
    })
   
    const [merchantStore,setMerchantStore]=useState({
        pin:'',
    })
    const [userRadio,setUserRadio]=useState(false)
    const [userRadioData,setUserRadioData]=useState('')
    const [radioErros,setRadioError]=useState('')
    const [stateList,setStateList]=useState([])
    const [adminList,setAdminList]=useState([])
    const [adminId,setAdminId]=useState()
    const [errorAdminId,setErrorAdminId]=useState()
    const [errorPin,setErrorPin]=useState()
    // ==================== get state and admin data---------
       const  getState=async()=>
       {
        // console.log('hello')
         await axios.get(BASE_URL+GET_MERCHAN_STATE).then(result=>{
            if(result.status==200)
            {
                setStateList(result.data.states)
                setAdminList(result.data.admin_list)
            }else{
                setStateList([])
                setAdminList([])
            }
         })

       }

       useEffect(()=>{
        getState()
       },[])
    
       const onChangeAdminId=async(e)=>
       {
            const{name,value}=e.target
            setAdminId(value)
            const data={m_id:value}
            await axios.post(BASE_URL+GET_ADMIN_DATA,data,{
                headers: {
                    "Content-Type": "multipart/form-data"
                },

            }).then(result=>{
                setStore({
                    ...store,
                    storename:result.data.own_store,
                    state:result.data.a_state,
                    phone:result.data.phone,
                    ownerName:result.data.owner_name,
                    errors:{
                        ownerName:'',
                        state:'',
                        storename:'',


                    },

                })
                
                if(result.data.login_pin !=="")
                {
                    setMerchantStore({
                        ...merchantStore,
                        pin:result.data.login_pin
    
                    })
                    setErrorPin('')
                }
                

            })
            if(e.target.value=="")
            {
                setErrorAdminId('Please select adminId field')

            }else{
                setErrorAdminId('')

            }
            
       }
    
   
     
       
    // ==================== get state and admin data---------
    
// --------------------radio button---------------------------
    const onClickUserRadio=(e)=>{
      const{value}=e.target
      if((value.toLowerCase().trim())=='admin')
        {
            setUserRadio(false)
            setUserRadioData(e.target.value)
            setAdminId('')
            setMerchantStore({pin:''})
            // setStore({
            //     ...store,
            //     storename:'',
            //     ownerName:'',
            //     email:'',
            //     password:'',
            //     phone:'',
            //     state:'',
            //     errors:{
            //         storename:'',
            //         ownerName:'',
            //         email:'',
            //         password:'',
            //         phone:'',
            //         state:'',
            //     }
            // })

        }else if((value.toLowerCase().trim())=='merchant')
        {
            setUserRadio(true)
            setUserRadioData(e.target.value)
            
            
        }
        setRadioError('')
         
        
    }
// -------------------radio button end---------------------------

    const handleChangeMerchant=(e)=>{
        const{name,value}=e.target
       
        setMerchantStore({...merchantStore,
            [name]:value
        })
        if(e.target.value=="")
        {
            setErrorPin('Please select pin field')

        }else if(merchantStore.pin.length !== 3)
        {
            setErrorPin('Please give proper length')
            // error=true

        }
        else{
            setErrorPin('')
        }

    }
    
    const check_user_password=async()=>{
        const data={email:merchantStore.mer_email,password:merchantStore.mer_password}
        await axios.post(BASE_URL+ADMIN_CHECK_USER,data,{
            headers: {
                "Content-Type": "multipart/form-data"
              },

        }).then(result=>{
            console.log(result)
        })
       
    }
    useEffect(() => {
        if (merchantStore.mer_password !=="" && merchantStore.mer_email !=="") 
        {
            check_user_password()
        }
      }, [merchantStore.mer_password]);

    const handleChange=(e)=>{
       const{name,value}=e.target
       let updatedErrors = { ...store.errors };
       let emailRegex=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
       let reg = /^[0-9\b]+$/

       if (name === "storename") 
       {
        updatedErrors[name] = value === "" ? `Please fill the ${name} field`:''
        // : value.length  < 4 ? 'Please fill more than character':'';
        // handleChange12()
      }
      if(name=="ownerName")
      {
        updatedErrors[name] = value === "" ? `Please fill the ${name} field` 
        : '';
      }
      if(name=="email")
      {
        updatedErrors[name] = value === "" ? `Please fill the ${name} field` 
        : !emailRegex.test(value)?'Please fill valid email':'';
      }
      if(name=="password")
      {
        updatedErrors[name] = value === "" ? `Please fill the ${name} field` 
        : '';
      }
      if(name=="state")
      {
        updatedErrors[name] = value === "" ? `Please fill the ${name} field` 
        : '';
      }
      if (name === 'phone') {
        // Validate and format the phone number (allow only numeric characters)
        const numericValue = value.replace(/[^0-9]/g, '');
    
        if (numericValue.length !== 10) {
          updatedErrors[name] = 'Phone number must be 10 digits';
        } else {
          updatedErrors[name] = '';
        }
      }
      setStore({
        ...store,
        errors: updatedErrors,
        [name]: value
      });
    }
    const handleKeyPress = (e) => {
        // Allow only numeric characters (key codes 48 to 57) and backspace (key code 8)
        if ((e.charCode < 48 || e.charCode > 57) && e.charCode !== 8) {
          e.preventDefault();
        }
      };


    const validateForm = errors => {
        // console.log(errors)
        if((errors.storename=="") && (errors.state=="")&& (errors.phone=="")&& (errors.password=="")
        && (errors.ownerName=="")&& (errors.email==""))
        {
            return true
        }else{
            return false
        }
      };
    
    // =====================================================
    function validate()
    {

        let error=false
        let errorMessage=''
        let errors= store.errors
        if(userRadioData=="")
        {
            errorMessage="please fill the field"
            error=true

        }else if(userRadioData !=="")
        {    
            errorMessage=""
            error=false

        }
        // 
        if((userRadioData=="") || (userRadioData=='admin')|| (userRadioData=='merchant'))
        {
            if(store.storename=="")
            {
                errors.storename="Please fill the store field"
                error=true
    
            }
    
            if(store.ownerName=="")
            {
                errors.ownerName="Please fill the store ownerName"
                error=true
    
            }
            if(store.email=="")
            {
                errors.email="Please fill the store email"
                error=true
    
            }
            if(store.password=="")
            {
                errors.password="Please fill the store password"
                error=true
    
            }
            
            if(store.state=="")
            {
                errors.state="Please fill the store state"
                error=true
    
            }  

        }
        setRadioError(errorMessage)
        setStore({...store,errors})
        if(error==true)
        {
            return false
        }else{
            return true
        } 
    
    }
    function validateData()
    {
        let error=false
        
        if(adminId==undefined)
        {
            // setError({adminId:'Please select adminId field'})
            setErrorAdminId('Please select adminId field')
            // errors="Please select admin field"
            error=true
        }else{
            setErrorAdminId('')
            error=false

        }
        if(merchantStore.pin=="")
        {
            setErrorPin('Please select pin field')
            error=true
            
        }
        else{
            setErrorPin('')
            error=false

        }
     

        if(error==true){
            return false

        }else{
            return true
        }
       

    }
    const handleSubmitMerchant=async(e)=>
    {
        e.preventDefault()
        let validateMerchant=validateData()
        
        const isValidate=validate()
        console.log('merchant')
        
        if((validateMerchant) && (isValidate))
        {
            console.log("merchant")
            // const data={login_pin:merchantStore.pin,admin:adminId,storename:store.storename,
            //     ownerName:store.ownerName,email:store.email,password:store.password,phone:store.phone,
            //     state:store.state,created_by_user:'superadmin',
            // user_type:userRadioData
            // }
            // await axios.post(BASE_URL+ADD_MERCHAN_EMPLOYEE,data,
            //     { headers: { "Content-Type": "multipart/form-data" } }).then(result=>{
            //         console.log(result)

            // })


        }
       
    }
    
    // =====================================================
    const handleSubmit= async(e)=>
    {
        e.preventDefault()
      
        console.log('admin11')
        // const data=[{name:'rinkekse',lastname:'yadav',}]
        
        // let id='123'
        // navigate(`/user/editcustomer/${id}`,{ state: data})
       

        // ====================================================
        const isValidate=validate()
        const currentValidate=validateForm(store.errors)
        if(userRadioData.toLowerCase()=="admin")
        {
            
            if(isValidate)
            {
                
                if(currentValidate)
                {
                    console.log("admin1")
                    // const data={storename:store.storename,ownerName:store.ownerName,email:store.email,password:store.password,phone:store.phone,state:store.state,created_by_user:'superadmin',
                    // user_type:userRadioData
                    // }
                    // await axios.post(BASE_URL+ADD_MERCHAN_EMPLOYEE,data,
                    //     { headers: { "Content-Type": "multipart/form-data" } }).then(result=>{
                    //         console.log(result.data)
        
                    // })

                   
    
                }
    
            }

        }      
        // ===============================================================================   
    }
   
    return {handleChange,store,handleSubmit,onClickUserRadio,userRadio,merchantStore,handleChangeMerchant
    ,radioErros,stateList,adminList,stateList,adminId,onChangeAdminId,handleSubmitMerchant,errorAdminId,
    errorPin,handleKeyPress}

}
export default MerchantFunction