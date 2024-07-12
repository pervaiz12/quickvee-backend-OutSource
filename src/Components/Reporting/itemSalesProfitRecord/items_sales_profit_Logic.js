import React, { useState } from "react";
import { ITEM_SALES_PROFIT_REPORT, BASE_URL } from "../../../Constants/Config";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import axios from "axios";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import PasswordShow from "../../../Common/passwordShow";

export default function Items_sales_profit_Logic() {
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();

  const [getItemRecord, setItemRecord] = useState([]);
  const [getMessageRecord, setgetMessageRecord] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  const onDateRangeChange = async (data) => {
    const { start_date, end_date } = data;
    const { token, ...newAdmin } = userTypeData;
    const packet = { merchant_id, start_date, end_date, ...newAdmin };
    try {
      setLoading(true);
      let res = await axios.post(BASE_URL + ITEM_SALES_PROFIT_REPORT, packet, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Use data?.token directly
        },
      });

      // .then((res) => {
      //   console.log(res?.data);
      if (res?.data?.status == "Success") {
        const updatedList = res.data?.profit_data.map((item) => {
          const cost_item =
            parseFloat(item?.cost_price) * parseFloat(item?.total_qty);
          const selling_price =
            parseFloat(item?.price) * parseFloat(item?.total_qty);
          const profit_per =
            ((parseFloat(selling_price) - parseFloat(cost_item)) /
              parseFloat(selling_price)) *
            100;
          return {
            ...item,
            costOfItem: (
              parseFloat(item?.cost_price) * parseFloat(item?.total_qty)
            ).toFixed(2),
            sellingPrice: (
              parseFloat(item?.price) * parseFloat(item?.total_qty)
            ).toFixed(2),
            profitMargin: selling_price === 0 ? "0.00%" : profit_per.toFixed(2),
            profitAmmount: (
              (parseFloat(item?.price) - parseFloat(item?.cost_price)) *
              parseFloat(item?.total_qty)
            ).toFixed(2),
          };
        });
        console.log("updatedList", updatedList);
        setItemRecord(updatedList);
        setLoading(false);
      } else {
        setgetMessageRecord(res?.data?.msg);
        setLoading(false);
        setItemRecord([]);
      }
      // });
    } catch (error) {
      if (error.response.status == 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      }
      setLoading(false);
    }
  };
  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      getItemRecord,
      type,
      name,
      sortOrder
    );
    setItemRecord(sortedItems);
    setSortOrder(newOrder);
  };

  return {
    onDateRangeChange,
    getItemRecord,
    getMessageRecord,
    loading,
    sortByItemName,
  };
}
