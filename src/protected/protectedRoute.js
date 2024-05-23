import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Route, useNavigate, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; //,localAuthCheck
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

export default function ProtectedRoute(props) {
  const location = useLocation();
  console.log(location.pathname);
  let AuthSessionRecord =
    Cookies.get("loginDetails") !== undefined
      ? Cookies.get("loginDetails")
      : [];
  let authdecryptRecord = CryptoJS.AES.decrypt(
    AuthSessionRecord,
    "secret key"
  ).toString(CryptoJS.enc.Utf8);
  const AdminRocord =
    authdecryptRecord !== ""
      ? JSON.parse(authdecryptRecord)
      : { status: false };

  console.log(AdminRocord);
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
      AdminRocord?.data?.login_type == "admin" ||
      AdminRocord?.login_type == "manager" ||
      AdminRocord?.login_type == "admin") &&
    props.visible == "manager"
  ) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
  // return AdminRocord?.status == true ? <Outlet /> : <Navigate to="/login" />;

  // If authenticated, render the protected component
}
