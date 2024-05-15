import React,{useEffect} from 'react'
import { Grid } from "@mui/material";
import storeDefaultImage from "../../Assests/Vendors/DefaultStore.svg";
import EmailLogo from "../../Assests/Vendors/EmailLogo.svg";
import PhoneLogo from "../../Assests/Vendors/PhoneLogo.svg";
import {Link} from 'react-router-dom'
import { useSelector, useDispatch} from "react-redux";//,localAuthCheck 
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie'; 
import AddIcon from "../../Assests/Category/addIcon.svg";
import {getAuthSessionRecord,handleGetStoreRecord,getAuthInvalidMessage} from "../../Redux/features/Authentication/loginSlice";
import AddManagerFormModel from "./AddManagerFormModel";
import { useNavigate } from 'react-router-dom';

const managerStore = [
  {
    name: "Adam Willson",
    email: "adamwillson@gmail.com",
    phone: "555-32342-234324",
    stores: ["Store Name-1", "Store Name-Lorem 2", "Store 3"],
  },
  {
    name: "Adam Willson",
    email: "adamwillson@gmail.com",
    phone: "555-32342-234324",
    stores: ["Store Name-1", "Store Name-Lorem 2", "Store 3"],
  },
  {
    name: "Adam Willson",
    email: "adamwillson@gmail.com",
    phone: "555-32342-234324",
    stores: ["Store Name-1", "Store Name-Lorem 2", "Store 3"],
  },
  {
    name: "Adam Willson",
    email: "adamwillson@gmail.com",
    phone: "555-32342-234324",
    stores: ["Store Name-1", "Store Name-Lorem 2", "Store 3"],
  },
  {
    name: "Adam Willson",
    email: "adamwillson@gmail.com",
    phone: "555-32342-234324",
    stores: ["Store Name-1", "Store Name-Lorem 2", "Store 3"],
  },
];
const stores = [
  { id: 1,value: 'chocolate', title: 'Chocolate' },
  { id: 2,value: 'strawberry', title: 'Strawberry' },
  { id: 3,value: 'vanilla', title: 'Vanilla' },
];


const ManagerStore = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let AuthSessionRecord=Cookies.get('loginDetails') !==undefined ? Cookies.get('loginDetails') :[]
    const AdminRocordNew=useSelector((state)=>CryptoJS.AES.decrypt(state?.loginAuthentication?.getUserRecord, 'secret key').toString(CryptoJS.enc.Utf8));
    const AdminRocord= AdminRocordNew !=="" ?JSON.parse(AdminRocordNew):[]
    let UserLoginDataStringFy=Cookies.get('user_auth_record') !==undefined ? Cookies.get('user_auth_record') :[]
    const getUserLoginAuth = atob(UserLoginDataStringFy);
    const GetSessionLogin=getUserLoginAuth !==""? JSON.parse(getUserLoginAuth):[]
    useEffect(()=>{
      if( AuthSessionRecord !=="")
        {
          dispatch(getAuthSessionRecord(AuthSessionRecord))
        }
      
    },[AuthSessionRecord])
    
      const handleSubmitStoreRecord=(merchant_id)=>{
        const data={username:GetSessionLogin?.username,password:GetSessionLogin.password,login_type:AdminRocord?.data?.login_type,merchant_id:merchant_id}
        dispatch(handleGetStoreRecord(data)).then(result=>{
          if(result?.payload?.status==true)
            {
              console.log(result?.payload)
              console.log(result?.payload?.final_login)
              if(result?.payload?.final_login==1)
                {
                  navigate(`/`)
                 
                }else{
                  console.log("store page called")
                }
              
              
            }else{
                Cookies.remove('loginDetails');
                Cookies.remove('user_auth_record');
                // navigate('/login'), { state: {msg: result?.payload?.msg} }
                dispatch(getAuthInvalidMessage(result?.payload?.msg))
                navigate('/login')
      
            }
        })
      
      }
    
  let getSingleStore = (result) => {
    const matchedStorenew = AdminRocord?.data?.stores?.find(store => store?.merchant_id === result);
    if (matchedStorenew) {
        // console.log("Matched store:", matchedStorenew); // Check if the matched store is correct
        return <p className="p-1 border me-3 store-items-store-names" onClick={()=>handleSubmitStoreRecord(matchedStorenew?.merchant_id)} key={matchedStorenew?.id}>{matchedStorenew.name}</p>;
    }
}


  return (
    <>
   
   <Grid container-fluid className="managerStore-title-main border">
        <Grid item xs={12}>
          <div className="flex justify-between  m-3">
            <p className="managerStore-title select-none">Manager</p>
            <div className="flex items-center cursor-pointer">
              {/* <p className="me-3 select-none managerStore-btn" style={{whiteSpace:"nowrap"}}>Add Manager</p> <img src={AddIcon} /> */}
              <AddManagerFormModel stores={AdminRocord} />
            </div>
          </div>
        </Grid>
      </Grid>
        <Grid container className="store-items-list" spacing={2}>
            {
                AdminRocord?.data?.login_type=="admin"?
                AdminRocord?.data?.managers && Array.isArray(AdminRocord?.data?.managers)?
                AdminRocord?.data?.managers?.map((item,Index)=>{
                    // console.log(result)
                    return(
                        <Grid item className="store-items " xs={12} sm={6} key={Index}>
                            <div className="store-item-card-manager border my-2 p-4">
                            <div className="flex">
                                <div className="me-5 flex items-start">
                                <img src={item.img || storeDefaultImage} alt="store_image" />
                                </div>
                                <div className="grid content-center w-full store-items-address">
                                <div className="flex justify-between">
                                    <p className="store-items-store-name">{item.name}</p>
                                    <p className="store-items-edit-btn">Edit</p>
                                </div>

                                <div className="store-items-store-name-address w-full">
                                    <span className="flex ">
                                    <img className="me-2" src={EmailLogo} />
                                    <span className="me-4">{`${item.email} `}</span>
                                    </span>
                                    <span className="flex  ">
                                    <img className="" src={PhoneLogo} />
                                    <span>{`${item.phone} `}</span>
                                    </span>
                                </div>
                                <div className="flex mt-2">
                                {
                                      item?.merchant_id.includes(',') ?
                                      item?.merchant_id.split(',')?.map((merchantData,index) => {
                                          const matchedStore = AdminRocord?.data?.stores?.find(store => store?.merchant_id === merchantData)
                                          if (matchedStore) {
                                            // console.log(handleGetStoreData)
                                              return <p onClick={()=>handleSubmitStoreRecord(matchedStore?.merchant_id)} key={index} className="p-1 border me-3 store-items-store-names">{matchedStore.name}</p>;
                                          }
                                      
                                      })
                                      :
                                        getSingleStore(item?.merchant_id)
                                  }  
                                {/* {item.stores.map((store) => (
                                <p className="p-1 border me-3 store-items-store-names">{store}</p>
                                ))} */}
                            </div>
                                </div>
                            </div>

                            
                            </div>
                        </Grid>

                    )

                }):[]
                :''
            }
        </Grid>
  
      {/* <Grid container className="store-items-list" spacing={2}>
        {managerStore.map((item, Index) => (
          <Grid item className="store-items " xs={12} sm={6} key={Index}>
            <div className="store-item-card border my-2 p-4">
              <div className="flex">
                <div className="me-5 flex items-start">
                  <img src={item.img || storeDefaultImage} alt="store_image" />
                </div>
                <div className="grid content-center w-full store-items-address">
                  <div className="flex justify-between">
                    <p className="store-items-store-name">{item.name}</p>
                    <p className="store-items-edit-btn">Edit</p>
                  </div>

                  <div className="store-items-store-name-address w-full">
                    <span className="flex ">
                      <img className="me-2" src={EmailLogo} />
                      <span className="me-4">{`${item.email} `}</span>
                    </span>
                    <span className="flex  ">
                      <img className="" src={PhoneLogo} />
                      <span>{`${item.phone} `}</span>
                    </span>
                  </div>
                  <div className="flex mt-2">
                {item.stores.map((store) => (
                  <p className="p-1 border me-3 store-items-store-names">{store}</p>
                ))}
              </div>
                </div>
              </div>

              
            </div>
          </Grid>
        ))}
      </Grid> */}
    </>
  );
};

export default ManagerStore;