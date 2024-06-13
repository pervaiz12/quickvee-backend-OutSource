import React from "react";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { useHistory, useLocation } from "react-router-dom";
import { Route, useNavigate, Navigate, Outlet } from "react-router-dom";

export default function ProtectedOrderSummery() {
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
  return AdminRocord?.status == true && AdminRocord?.data?.merchant_id ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
