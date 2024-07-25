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
  const [loading, setLoading] = React.useState(false);
  const [loadingCount, setLoadingCount] = React.useState(false);
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();

  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const { token, ...newData } = userTypeData;
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  let data = {
    ...newData,
    merchant_id: merchant_id,
  };
  console.log(data);
  let countRecord = 0;
  let countCardData = 0;
  const getDashboardCountRecord = async (source) => {
    try {
      if (countCardData === 0) {
        setLoadingCount(true);
        countCardData++;
      }
      const response = await axios.post(
        BASE_URL + DASHBOARD_COUNT_STORE,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          cancelToken: source.token,
        }
      );
      if (response?.data?.status == true) {
        setDashboardCount(response?.data);
      }
    } catch (error) {
      if (error?.response?.status == 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error?.message == "Network Error") {
        getNetworkError();
      }
    }
    setLoadingCount(false);
  };

  const getDashboardTableRecord = async (source) => {
    try {
      if (countRecord === 0) {
        setLoading(true);
        countRecord++;
      }
      const response = await axios.post(BASE_URL + DASHBOARD_TABLE_LIST, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        cancelToken: source.token,
      });
      if (response?.data?.status == true) {
        console.log(response?.data?.data);
        setDashboardRecord(response?.data?.data);
        // setDashboardCount(response?.data);
      } else {
        setDashboardRecord([]);
      }
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
    setLoading(false);
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
    // getDashboardCountRecord();
    // getDashboardTableRecord();
    // CountDashboardInterval();
    // const fetchData = async () => {
    //   await getDashboardTableRecord();
    //   await getDashboardCountRecord();
    // };
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await Promise.all([
          getDashboardTableRecord(source),
          getDashboardCountRecord(source),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => {
      clearInterval(interval);
      source.cancel("Operation canceled due to merchant_id change.");
    };
    // return () => clearInterval(interval);
  }, [merchant_id]);
  return {
    dashboardCount,
    dashboardRecord,
    sortByItemName,
    loading,
    loadingCount,
  };
}
