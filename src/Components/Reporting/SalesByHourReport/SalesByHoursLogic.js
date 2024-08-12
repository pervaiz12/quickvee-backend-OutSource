import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { fetchSalesByHours } from "../../../Redux/features/Reports/SalesByHours/SalesByHoursSlice";
import { fetchStoreSettingOptionData } from "../../../Redux/features/StoreSettingOption/StoreSettingOptionSlice";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import PasswordShow from "../../../Common/passwordShow";

export default function SalesByHoursLogic() {
  const dispatch = useDispatch();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const getSalesByHoursList = useSelector((state) => state?.SalesByHoursData);
  const [TableLoader, setTableLoader] = useState("");
  const [SalesHoursData, setSalesHoursData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [advdayCount, setAdvDayCount] = useState("");
  // console.log(advCount);
  const [totalCost, setTotalCost] = useState({
    unitsold: 0,
  });
  let data1 = {
    merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
    ...userTypeData,
  };
  useEffect(() => {
    getFutureDayCount();
  }, []);
  const getFutureDayCount = async () => {
    try {
      let res = await dispatch(fetchStoreSettingOptionData(data1)).unwrap();
      if (res?.status == true) {
        setAdvDayCount(
          !!res?.user_data?.advance_count ? res?.user_data?.advance_count : 0
        );
      }
    } catch (error) {
      if (error?.status == 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      }
      console.log("error", error);
    }
  };
  useEffect(() => {
    setTableLoader(getSalesByHoursList?.loading);
    if (getSalesByHoursList?.SalesByHoursData) {
      setSalesHoursData(getSalesByHoursList.SalesByHoursData);
      getDiscountRecord(getSalesByHoursList.SalesByHoursData);
    } else {
      setSalesHoursData([]);
    }
  }, [
    getSalesByHoursList?.loading,
    getSalesByHoursList?.SalesByHoursData?.length,
  ]);

  const title = "Sales by Hour Report";
  const merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  //   get date data function---- dispatch(fetchBrandData(data)).unwrap()
  // ============
  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder, sortIcon } = SortTableItemsHelperFun(
      SalesHoursData,
      type,
      name,
      sortOrder
    );
    console.log(sortedItems);
    if (sortedItems) {
      setSalesHoursData(sortedItems);
    } else {
      setSalesHoursData([]);
    }
    setSortOrder(newOrder);
  };
  // ============
  const rowHeader = ["Interval Start", "Interval End", "Total Amount"];
  const onDateRangeChange = async (Date) => {
    try {
      const data = { merchant_id, ...userTypeData, ...Date };
      await dispatch(fetchSalesByHours(data)).unwrap();
    } catch (error) {
      if (error.status == 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      }
    }
  };
  //   get date data function----
  // ===========================
  const getDiscountRecord = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      const { unitsold } = data.reduce(
        (acc, item) => {
          const unitsold = parseFloat(item?.total_amount || 0);
          return {
            unitsold: parseFloat(acc.unitsold) + unitsold,
          };
        },
        { unitsold: 0 } // Initial values including totalCost
      );
      setTotalCost({
        unitsold: unitsold.toFixed(2),
      });
    } else {
      console.log("No report data available");
    }
  };
  // ===========================
  return {
    title,
    onDateRangeChange,
    SalesHoursData,
    rowHeader,
    TableLoader,
    sortByItemName,
    totalCost,
    advdayCount,
  };
}
