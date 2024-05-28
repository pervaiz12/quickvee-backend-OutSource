import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Route, useNavigate, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; //,localAuthCheck
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

export default function ProtectedRoute(props) {
  const location = useLocation();
  const navigate = useNavigate();
  let AuthSessionRecord =
    Cookies.get("token_data") !== undefined ? Cookies.get("token_data") : [];
  let authdecryptRecord = CryptoJS.AES.decrypt(
    AuthSessionRecord,
    "secret key"
  ).toString(CryptoJS.enc.Utf8);
  const AdminRocord =
    authdecryptRecord !== ""
      ? JSON.parse(authdecryptRecord)
      : { status: false };
  const handleClearCoockie = () => {
    Cookies.remove("loginDetails");
    Cookies.remove("user_auth_record");
    Cookies.remove("token_data");
    localStorage.removeItem("AllStore");
  };

  if (
    AdminRocord?.status == true &&
    AdminRocord?.login_type == "superadmin" &&
    props.visible == "superadmin"
  ) {
    return <Outlet />;
  } else if (
    AdminRocord?.status == true &&
    (AdminRocord?.login_type == "superadmin" ||
      AdminRocord?.data?.login_type == "manager" ||
      AdminRocord?.data?.login_type == "merchant" ||
      AdminRocord?.data?.login_type == "admin" ||
      AdminRocord?.login_type == "merchant" ||
      AdminRocord?.login_type == "manager" ||
      AdminRocord?.login_type == "admin") &&
    props.visible == "manager" &&
    (AdminRocord?.data?.merchant_id !== "" ||
      AdminRocord?.data?.merchant_id == "no_id") &&
    AdminRocord?.data?.merchant_id !== undefined
  ) {
    return <Outlet />;
  } else {
    handleClearCoockie();
    return <Navigate to="/login" />;
  }

  // return AdminRocord?.status == true ? <Outlet /> : <Navigate to="/login" />;

  // If authenticated, render the protected component
  // else if (
  //   AdminRocord?.status == true &&
  //   (AdminRocord?.data?.login_type == "manager" ||
  //     AdminRocord?.data?.login_type == "admin" ||
  //     AdminRocord?.data?.login_type == "merchant" ||
  //     AdminRocord?.login_type == "manager" ||
  //     AdminRocord?.login_type == "merchant" ||
  //     AdminRocord?.login_type == "admin") &&
  //   props.visible == "manager" &&
  //   AdminRocord?.data?.stores !== undefined &&
  //   AdminRocord?.data?.stores.length >= 0
  // ) {
  //   return <Outlet />;
  // }
}
