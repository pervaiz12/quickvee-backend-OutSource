import React,{useEffect} from 'react';
import { Route, useNavigate,Navigate,Outlet} from 'react-router-dom';
import { useSelector, useDispatch} from "react-redux";//,localAuthCheck 
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie'; 

export default function ProtectedRoute(props) {
    let AuthSessionRecord=Cookies.get('loginDetails') !==undefined ? Cookies.get('loginDetails') :[]
    let authdecryptRecord=CryptoJS.AES.decrypt(AuthSessionRecord, 'secret key').toString(CryptoJS.enc.Utf8)
    const AdminRocord= authdecryptRecord !=="" ?JSON.parse(authdecryptRecord):{status:false}

    console.log(AdminRocord?.status)


  return AdminRocord?.status==true ? <Outlet/>: <Navigate to="/login"/>

  // If authenticated, render the protected component

}
