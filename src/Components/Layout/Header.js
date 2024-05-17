// import * as React from "react";
import { useState, useEffect } from "react";
import Quick from "../../Assests/Dashboard/quickveeLG.png";
import { BiMenu, BiChevronDown } from "react-icons/bi";
// import { useSelector, useDispatch } from "react-redux";
import DownlIcon from "../../Assests/Dashboard/download.svg";
import OnlineData from "../../Assests/Dashboard/online.svg";
import SynkData from "../../Assests/Dashboard/sync.svg";
import DownIcon from "../../Assests/Dashboard/Down.svg";
import { setMenuOpen } from "../../Redux/features/NavBar/MenuSlice";
import Cookies from 'js-cookie'; 
import CryptoJS from 'crypto-js'; 
import UserLogo from "../../Assests/Dashboard/UserLogo.svg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from "react-redux";//,localAuthCheck 

import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {getAuthSessionRecord,handleGetStoreRecord,getAuthInvalidMessage,getUserRecordData,getUserDashboardRecord} from "../../Redux/features/Authentication/loginSlice";
import { display } from "@mui/system";


export default function Header() {
  const dispatch = useDispatch();
  const isMenuOpenRedux = useSelector((state) => state.NavBarToggle.isMenuOpen);
  // ----------------------
  // const AdminRocordNew=useSelector((state)=>CryptoJS.AES.decrypt(state?.loginAuthentication?.getUserRecord, 'secret key').toString(CryptoJS.enc.Utf8));
  let AuthFinalLogin=Cookies.get('loginDetails') !==undefined ? Cookies.get('loginDetails') :[]
   let LoginGetDashBoard=Cookies.get('token_data') !==undefined ? Cookies.get('token_data') :[]
 
  const AdminRocordNew=useSelector((state)=>CryptoJS.AES.decrypt(state?.loginAuthentication?.getUserRecord, 'secret key').toString(CryptoJS.enc.Utf8));
  let LoginAllStore=AdminRocordNew !==""? JSON.parse(AdminRocordNew):""
  let LoginGetDashBoardRecord=useSelector((state)=>CryptoJS.AES.decrypt(state?.loginAuthentication?.StoreUserDashboardRecord, 'secret key').toString(CryptoJS.enc.Utf8));
  let LoginGetDashBoardRecordJson=LoginGetDashBoardRecord !==""? JSON.parse(LoginGetDashBoardRecord):""
  // console.log(LoginGetDashBoardRecordJson)
  // console.log(LoginAllStore)
// =================================
  // ===================================
  let UserLoginDataStringFy=Cookies.get('user_auth_record') !==undefined ? Cookies.get('user_auth_record') :[]
  let UserLoginRecord=useSelector((state)=>state?.loginAuthentication?.getUserLoginRecord)
  const getUserLoginAuth = atob(UserLoginRecord);
  const GetSessionLogin=getUserLoginAuth !==""? JSON.parse(getUserLoginAuth):[]
  // ===================================AuthDecryptDataDashBoardJSONFormat?.data?.name   LoginSuccessJson?.data?.name
  // 
  let allStoresData=LoginAllStore?.data?.stores
  let storenameCookie=LoginGetDashBoardRecordJson !=="" ? LoginGetDashBoardRecordJson?.data?.name :LoginGetDashBoardRecordJson?.data?.name
  console.log(storenameCookie)
  useEffect(()=>{
    setStoreName(storenameCookie)
  },[LoginGetDashBoardRecordJson])
 
  // useEffect for all when update data in coockie-----------------
  

    //AuthFinalLogin
    useEffect(()=>{
      if( AuthFinalLogin !=="")
        {
          dispatch(getAuthSessionRecord(AuthFinalLogin))
        }
      
    },[AuthFinalLogin])
 
  useEffect(()=>{
    dispatch(getUserDashboardRecord(LoginGetDashBoard))
  },[LoginGetDashBoard])
  useEffect(()=>{
    dispatch(getUserRecordData(UserLoginDataStringFy))
  },[UserLoginDataStringFy])
   
  // useEffect for all when update data in coockie--------------

  const handleClose=()=>{
    setAnchorEl(null);
  }
  
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [storename,setStoreName]=useState(storenameCookie)
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
   
    Cookies.remove('loginDetails');
    Cookies.remove('user_auth_record');
    Cookies.remove('token_data');
    localStorage.removeItem("AllStore")
    navigate('/login')
  };
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleChangeMerchant=(merchant_id)=>{
    const data={username:GetSessionLogin?.username,password:GetSessionLogin.password,login_type:LoginGetDashBoardRecordJson?.login_type,merchant_id:merchant_id}
    console.log(data)
    dispatch(handleGetStoreRecord(data)).then(result=>{
      if(result?.payload?.status==true)
        {
          if(result?.payload?.final_login==1)
            {
              navigate(`/`)
            }else{
              console.log("store page called")
            }
   
        }else{
            Cookies.remove('loginDetails');
            Cookies.remove('user_auth_record');
            // Cookies.remove('token_data');
            dispatch(getAuthInvalidMessage(result?.payload?.msg))
            navigate('/login')
  
        }
    })

  }

  return (
    <>
      <div
        className={`q_header_section sticky bg-white  border-b-4 border-black ${
          isSticky ? "sticky-header" : ""
        }`}
      >
        <div className="flex items-center px-4 mx-2">
          {
            LoginGetDashBoardRecordJson?.final_login==1?
            <BiMenu
            className={`text-black text-[30px] hover:text-yellow-500 active:text-yellow-700 transition duration-300 ease-in-out`}
            onClick={(e) => {
              // setIsMenuOpen(!isMenuOpen); || AdminRocord?.final_login==1
              // (LoginSuccessJson?.final_login==1 || AuthDecryptDataDashBoardJSONFormat?.final_login==1 )
              dispatch(setMenuOpen(!isMenuOpenRedux));
            }}
          />
          :''
          }
          <a href="/dashboard">
            <img src={Quick} alt="Logo" className="ml-6" />
          </a>
         { LoginGetDashBoardRecordJson?.final_login==1 ?
         (LoginAllStore?.data?.stores !==undefined || localStorage.getItem("AllStore")) ?
          <div className="relative">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{storename}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={storename}
              label={storename}
              // onChange={handleChangeStore}
            >
              {
                // console.log(JSON.parse(localStorage.getItem("AllStore")))
             
                (JSON.parse(localStorage.getItem("AllStore"))!==""|| Array.isArray(allStoresData)) ? (JSON.parse(localStorage.getItem("AllStore")) || allStoresData)?.map((result,index)=>{
                  console.log(result)
                  return(
                    <MenuItem  onClick={()=>handleChangeMerchant(result?.merchant_id)}value={result?.name}>{result?.name}</MenuItem>

                  )
                })
                :""
      
              }
              {/* <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
          
            {/* <div
              className="flex items-center ml-6 px-3 py-1 text-black lg:text-[20px] admin_medium cursor-pointer sm:text-[12px] md:text-[15px]"
              onClick={handleDropdownToggle}
            >
              Vape Store
              <img src={DownIcon} alt="" className="w-8 h-10 ml-2" />
            </div>

            
            {showDropdown && (
              <div className="absolute mt-2 bg-white border rounded shadow-lg">
               
                <div className="p-4">
                 
                        <div>Category 1</div>
                  <div>Category 2</div>
                  <div>Category 3</div>
                
                </div>
              </div>
            )} */}
          </div>
          :''
          :''
          }
          <div className="flex items-center lg:text-[20px] text-black ml-auto sm:text-xs md:text-sm">
            {/* Download App section */}
            {/* ================================ */}
            {
             (LoginGetDashBoardRecordJson?.final_login==1 ) ?
            <>
            <div className="ml-12 flex items-center">
              <img src={DownlIcon} alt="icon" className="ml-2" />
              <p className="cursor-pointer ml-2 admin_medium">Download App</p>
            </div>

            {/* Online Store and Sync Data section */}
            <div className="ml-12 flex items-center">
              <img src={OnlineData} alt="icon" className="ml-2" />
              <p className="cursor-pointer ml-2 admin_medium">Online Store</p>
            </div>
            <div className="mx-12 flex items-center">
              <img src={SynkData} alt="icon" className="ml-2" />
              <p className="cursor-pointer ml-2 admin_medium">Sync Data</p>
            </div>
            </>
            :''
            }
            {/* ======================================== */}
            <div
              className="flex  items-center"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <img
                style={{ height: "24px", width: "24px" }}
                src={UserLogo}
                alt="icon"
                className="mx-2"
              />
              <p className="admin_medium">{storename}</p>
              <img src={DownIcon} alt="" />
            </div>

            <Menu
              PaperProps={{
                style: {
                  width: 150,
                  marginTop: 20,
                },
              }}
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>

            {/* </div> */}

            {/* Vertical line separator */}
            <div className="border-t-3 border-b-2 border-black bg-black mb-16"></div>
          </div>
        </div>
      </div>
    </>
  );
}
