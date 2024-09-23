import React, { useState } from "react";
import { GET_LOTTERY_DATA_REPORT, BASE_URL } from "../../../Constants/Config";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import axios from "axios";

export default function LotteryPayoutLogic() {
  const { LoginGetDashBoardRecordJson, userTypeData } = useAuthDetails();
  const [getAllLatteryData, setAllLatteryData] = useState([]);
  const [apiLoader, setApiLoader] = useState(true);
  console.log("getAllLatteryData", getAllLatteryData);
  let merchant_id = !!LoginGetDashBoardRecordJson?.data?.merchant_id
    ? LoginGetDashBoardRecordJson?.data?.merchant_id
    : "";
  let token_id = LoginGetDashBoardRecordJson?.token_id;
  let token = LoginGetDashBoardRecordJson?.token;
  let login_type = LoginGetDashBoardRecordJson?.login_type;

  const onDateRangeChange = async (dateRange) => {
    try {
      let data = { merchant_id, token_id, login_type, ...dateRange };
      let response = await axios.post(
        BASE_URL + GET_LOTTERY_DATA_REPORT,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response);
      if (response?.data?.status == true) {
        setApiLoader(false);
        setAllLatteryData(response?.data?.lottery_data);
      } else {
        setApiLoader(false);
        setAllLatteryData([]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return { onDateRangeChange, getAllLatteryData, apiLoader };
}
