import React, { useState } from "react";
import { ITEM_SALES_PROFIT_REPORT, BASE_URL } from "../../../Constants/Config";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import axios from "axios";

export default function Items_sales_profit_Logic() {
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();

  const [getItemRecord, setItemRecord] = useState([]);
  const [getMessageRecord, setgetMessageRecord] = useState("");
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  const onDateRangeChange = (data) => {
    const { start_date, end_date } = data;
    const { token, ...newAdmin } = userTypeData;
    const packet = { merchant_id, start_date, end_date, ...newAdmin };
    try {
      let response = axios
        .post(BASE_URL + ITEM_SALES_PROFIT_REPORT, packet, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Use data?.token directly
          },
        })
        .then((res) => {
          // console.log(res);
          if (res?.data?.status == "Success") {
            setItemRecord(res?.data?.profit_data);
          } else {
            setgetMessageRecord(res?.data?.msg);
          }
        });
    } catch (error) {
      console.log("Error", error);
    }
  };
  return { onDateRangeChange, getItemRecord, getMessageRecord };
}
