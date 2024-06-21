import React, { useEffect, useState } from "react";
import {
  BASE_URL,
  DASHBOARD_COUNT_STORE,
  DASHBOARD_TABLE_LIST,
} from "../../Constants/Config";
import axios from "axios";
import { useAuthDetails } from "./../../Common/cookiesHelper";
import { SortTableItemsHelperFun } from "../../helperFunctions/SortTableItemsHelperFun";
import PasswordShow from "../../Common/passwordShow";

export default function DashboardFunctionality() {
  const [dashboardCount, setDashboardCount] = React.useState("");
  const [dashboardRecord, setDashboardRecord] = React.useState([]);
  const { handleCoockieExpire, getUnAutherisedTokenMessage } = PasswordShow();

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
    try {
      const response = await axios.post(
        BASE_URL + DASHBOARD_COUNT_STORE,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.status == true) {
        setDashboardCount(response?.data);
      }
    } catch (error) {
      getUnAutherisedTokenMessage();
      handleCoockieExpire();
    }
  };

  const getDashboardTableRecord = async () => {
    try {
      const response = await axios.post(BASE_URL + DASHBOARD_TABLE_LIST, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.status == true) {
        console.log(response?.data?.data);
        setDashboardRecord(response?.data?.data);
        // setDashboardCount(response?.data);
      } else {
        setDashboardRecord([]);
      }
    } catch (error) {
      getUnAutherisedTokenMessage();
      handleCoockieExpire();
    }
  };

  const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending

  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      dashboardRecord,
      type,
      name,
      sortOrder
    );
    setDashboardRecord(sortedItems);
    setSortOrder(newOrder);
  };

  useEffect(() => {
    getDashboardCountRecord();
    getDashboardTableRecord();
  }, [LoginGetDashBoardRecordJson?.data?.merchant_id]);
  return { dashboardCount, dashboardRecord, sortByItemName };
}
