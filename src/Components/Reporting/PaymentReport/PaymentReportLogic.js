import React, { useState } from "react";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import PasswordShow from "../../../Common/passwordShow";
import { BASE_URL, GET_PAYMENT_REPORT_DATA } from "../../../Constants/Config";
import axios from "axios";

const PaymentReportLogic = () => {
  const { LoginGetDashBoardRecordJson, userTypeData } = useAuthDetails();
  const merchant_id = !!LoginGetDashBoardRecordJson?.data?.merchant_id
    ? LoginGetDashBoardRecordJson?.data?.merchant_id
    : "";
  const token = !!LoginGetDashBoardRecordJson?.token
    ? LoginGetDashBoardRecordJson?.token
    : "";
  const token_id = !!LoginGetDashBoardRecordJson?.token_id
    ? LoginGetDashBoardRecordJson?.token_id
    : "";
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const [paymentData, setPaymentData] = useState([]);
  const onDateRangeChange = async (data) => {
    let dataNew = {
      start_date: data?.start_date,
      end_date: data?.end_date,
      merchant_id,
      token_id,
    };
    let response = await axios.post(
      BASE_URL + GET_PAYMENT_REPORT_DATA,
      dataNew,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response?.data?.status == true) {
      setPaymentData(response?.data?.result);
    } else {
      setPaymentData([]);
    }
  };
  return { onDateRangeChange, paymentData };
};

export default PaymentReportLogic;
