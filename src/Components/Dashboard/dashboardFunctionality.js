import React, { useEffect, useState } from "react";
import { BASE_URL, DASHBOARD_COUNT_STORE } from "../../Constants/Config";
import axios from "axios";
import { useAuthDetails } from "./../../Common/cookiesHelper";

export default function DashboardFunctionality() {
  const [dashboardCount, setDashboardCount] = React.useState("");
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const { token, ...newData } = userTypeData;
  let data = {
    ...newData,
    merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
  };
  const getDashboardCountRecord = async () => {
    const response = await axios.post(BASE_URL + DASHBOARD_COUNT_STORE, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response?.data?.status == true) {
      setDashboardCount(response?.data);
    }
  };
  useEffect(() => {
    getDashboardCountRecord();
  }, [LoginGetDashBoardRecordJson?.data?.merchant_id]);
  return { dashboardCount };
}
