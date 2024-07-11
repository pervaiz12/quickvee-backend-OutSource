import React from "react";

import Welcome from "./Welcome";
import NetSales from "./NetSales";
import SellItems from "./SellItems";
import MainHeader from "./MainHeader";
import CardForm from "./CardForm";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { useSelector, useDispatch } from "react-redux";
import DashboardFunctionality from "./dashboardFunctionality";
import DashboardTables from "./paginationTable";
import { useAuthDetails } from "./../../Common/cookiesHelper";
const DashboardMain = () => {
  const { dashboardCount, dashboardRecord,sortByItemName,loading } = DashboardFunctionality();
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  // let LoginGetDashBoardRecord = useSelector((state) =>
  //   CryptoJS.AES.decrypt(
  //     state?.loginAuthentication?.StoreUserDashboardRecord,
  //     "secret key"
  //   ).toString(CryptoJS.enc.Utf8)
  // );
  // let AuthDecryptDataDashBoardJSONFormat =
  //   LoginGetDashBoardRecord !== "" ? JSON.parse(LoginGetDashBoardRecord) : "";
  // const AdminRocordNew = useSelector((state) =>
  //   CryptoJS.AES.decrypt(
  //     state?.loginAuthentication?.getUserRecord,
  //     "secret key"
  //   ).toString(CryptoJS.enc.Utf8)
  // );
  // let LoginAllStore = AdminRocordNew !== "" ? JSON.parse(AdminRocordNew) : "";

  // ===================
  // --------------------------------------------------------------------------------------------------------------
  // console.log(AuthDecryptDataDashBoardJSONFormat)

  return (
    <>
      <div className="q-category-main-page">
        <Welcome />
      </div>
      <div className="q-category-main-page">{/* <MainHeader /> */}</div>
      <div className="q-category-main-page pb-5">
        <CardForm dashboardCount={dashboardCount} />
      </div>
      <div className="q-category-main-page">
        {/* <NetSales /> */}
        <DashboardTables
          dashboardRecord={dashboardRecord}
          merchant_id={merchant_id}
          sortByItemName={sortByItemName}
          loading={loading}
        />
      </div>
      <div className="q-category-main-page">{/* <SellItems /> */}</div>
    </>
  );
};

export default DashboardMain;
