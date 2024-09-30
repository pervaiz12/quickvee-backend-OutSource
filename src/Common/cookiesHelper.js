import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

//  let AuthFinalLogin=Cookies.get('loginDetails') !==undefined ? Cookies.get('loginDetails') :[]
//  let LoginGetDashBoard=Cookies.get('token_data') !==undefined ? Cookies.get('token_data') :[]

export const getSelectedData = (date1, type1) => {
  const selectedDate = dayjs(date1);
  const lastSevenMonths = [];
  const allMonth = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = selectedDate.subtract(i, type1).format("YYYY-MM-DD");
    allMonth.push(currentDate);
    lastSevenMonths.push(`${currentDate}_${currentDate}`);
  }

  const getDate = lastSevenMonths.join(", ");
  return { getDate, allMonth };
};

export const useAuthDetails = () => {
  let AuthFinalLogin =
    Cookies.get("loginDetails") !== undefined
      ? Cookies.get("loginDetails")
      : [];
  let LoginGetDashBoard =
    Cookies.get("token_data") !== undefined ? Cookies.get("token_data") : [];

  const AdminRocordNew = CryptoJS.AES.decrypt(
    AuthFinalLogin,
    "secret key"
  ).toString(CryptoJS.enc.Utf8);
  let LoginAllStore = AdminRocordNew !== "" ? JSON.parse(AdminRocordNew) : "";

  let LoginGetDashBoardRecord = CryptoJS.AES.decrypt(
    LoginGetDashBoard,
    "secret key"
  ).toString(CryptoJS.enc.Utf8);
  let LoginGetDashBoardRecordJson =
    LoginGetDashBoardRecord !== "" ? JSON.parse(LoginGetDashBoardRecord) : "";

  const token_id = LoginGetDashBoardRecordJson?.token_id;
  const login_type = LoginGetDashBoardRecordJson?.login_type;
  const token = LoginGetDashBoardRecordJson?.token;
  const user_id = LoginGetDashBoardRecordJson?.data?.id;
  const inventory_approval =
    LoginGetDashBoardRecordJson?.data?.inventory_approval;
  const future_ordering = LoginGetDashBoardRecordJson?.data?.future_ordering;
  const future_day_count = LoginGetDashBoardRecordJson?.data?.future_day_count;
  const future_date = future_ordering === "1" ? future_day_count : null;
  let userTypeData = { token_id, login_type, token };
  //  ------------  username and password save data-----------------
  let UserLoginDataStringFy =
    Cookies.get("user_auth_record") !== undefined
      ? Cookies.get("user_auth_record")
      : [];
  const getUserLoginAuth = atob(UserLoginDataStringFy);
  const GetSessionLogin =
    getUserLoginAuth !== "" ? JSON.parse(getUserLoginAuth) : [];
  //  --------------------------------------------------------------
  const storeData = !!localStorage.getItem("AllStore")
    ? JSON.parse(localStorage.getItem("AllStore"))
    : "";

  // ---------------------------------------------------------------

  return {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
    user_id,
    inventory_approval,
    future_date,
    storeData,
  };
};
