import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { fetchSalesByHours } from "../../../Redux/features/Reports/SalesByHours/SalesByHoursSlice";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import PasswordShow from "../../../Common/passwordShow";

export default function SalesByHoursLogic() {
  const dispatch = useDispatch();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const getSalesByHoursList = useSelector((state) => state?.SalesByHoursData);
  const [TableLoader, setTableLoader] = useState("");
  const [SalesHoursData, setSalesHoursData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [totalCost, setTotalCost] = useState({
    unitsold: 0,
  });

  console.log(getSalesByHoursList);
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

  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
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
  };
}
