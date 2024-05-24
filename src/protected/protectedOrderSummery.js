import React from "react";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { useHistory, useLocation } from "react-router-dom";
import { Route, useNavigate, Navigate, Outlet } from "react-router-dom";

export default function ProtectedOrderSummery() {
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
  return AdminRocord?.status == true ? <Outlet /> : <Navigate to="/login" />;
}
