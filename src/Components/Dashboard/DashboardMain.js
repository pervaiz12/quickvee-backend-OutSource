import React from "react";


import Welcome from "./Welcome";
import NetSales from "./NetSales";
import SellItems from "./SellItems";
import MainHeader from "./MainHeader";
import CardForm from "./CardForm";
import Cookies from 'js-cookie'; 
import CryptoJS from 'crypto-js'; 
import { useSelector, useDispatch } from 'react-redux'


const DashboardMain = () => {
  let LoginGetDashBoardRecord=useSelector((state)=>CryptoJS.AES.decrypt(state?.loginAuthentication?.StoreUserDashboardRecord, 'secret key').toString(CryptoJS.enc.Utf8));
  let AuthDecryptDataDashBoardJSONFormat=LoginGetDashBoardRecord !==""? JSON.parse(LoginGetDashBoardRecord):""
  const AdminRocordNew=useSelector((state)=>CryptoJS.AES.decrypt(state?.loginAuthentication?.getUserRecord, 'secret key').toString(CryptoJS.enc.Utf8));
  let LoginAllStore=AdminRocordNew !==""? JSON.parse(AdminRocordNew):""
  
  // ===================
  // --------------------------------------------------------------------------------------------------------------
  // console.log(AuthDecryptDataDashBoardJSONFormat)

  return (
    <>
    <div className="q-category-main-page">
   
      <Welcome />
      </div>
      <div className="q-category-main-page">
      <MainHeader />
      </div>
      <div className="q-category-main-page">
      <CardForm />
      </div>
      <div className="q-category-main-page">
      <NetSales />
      </div>
      <div className="q-category-main-page">
      <SellItems />
      </div>
      </>
   
  );
};

export default DashboardMain;
