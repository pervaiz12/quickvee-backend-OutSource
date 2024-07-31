import React from "react";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { fetchSalesByHours } from "../../../Redux/features/Reports/SalesByHours/SalesByHoursSlice";
import { useSelector, useDispatch } from "react-redux";

export default function SalesByHoursLogic() {
  const dispatch = useDispatch();

  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const title = "Sales by Hour Report";
  const merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  //   get date data function---- dispatch(fetchBrandData(data)).unwrap()
  const onDateRangeChange = async (Date) => {
    try {
      const data = { merchant_id, ...userTypeData, ...Date };
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  //   get date data function----
  return { title, onDateRangeChange };
}
