import React, { useEffect, useState } from "react";

import Welcome from "./Welcome";
import { Grid } from "@mui/material";
import NetSales from "./NetSales";
import SellItems from "./SellItems";
import MainHeader from "./MainHeader";
import CardForm from "./CardForm";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { useSelector, useDispatch } from "react-redux";
import DashboardFunctionality from "./dashboardFunctionality";
import DashboardTables from "./paginationTable";
import { useAuthDetails } from "./../../Common/cookiesHelper";
import DateRangeComponent from "../../reuseableComponents/DateRangeComponent";
import { TopProducts } from "./TopProducts";
import { TopEmployees } from "./TopEmployees";
import PasswordShow from "../../Common/passwordShow";
import { fetchSalePersonData } from "../../Redux/features/SalesByPerson/SalesByPersonSlice";
import { fetchItemSalesData } from "../../Redux/features/Reports/ItemSales/ItemSalesSlice";
const DashboardMain = () => {
  const {
    dashboardCount,
    dashboardRecord,
    sortByItemName,
    loading,
    loadingCount,
  } = DashboardFunctionality();
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  const [activeType, setActiveType] = useState("Month");
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const dispatch = useDispatch();

  // for Top Employees
  const salesByPersonList = useSelector((state) => state.SalesByPersonList);

  // for Top Products
  const itemSalesList = useSelector((state) => state.ItemSalesReportList);

  // fetching Sales Person List data
  const getSalePersonData = async () => {
    try {
      let data = {
        merchant_id,
        start_date: selectedDateRange.start_date,
        end_date: selectedDateRange.end_date,
        order_typ: "All",
        order_env: "All",
        employee_id: "All",
        ...userTypeData,
      };
      if (data) {
        const result = await dispatch(fetchSalePersonData(data)).unwrap();
        // console.log("emp data: ", result);
      }
    } catch (error) {
      if (error?.status == 401 || error?.response?.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error?.status == "Network Error") {
        getNetworkError();
      }
    }
  };

  // fetching Sales Items data
  const getFetchItemSalesData = async () => {
    try {
      let data = {
        merchant_id,
        start_date: selectedDateRange.start_date,
        end_date: selectedDateRange.end_date,
        order_typ: "All",
        order_env: "All",
        cat_name: "All",
        search_by: "",
        ...userTypeData,
      };
      if (data) {
        await dispatch(fetchItemSalesData(data)).unwrap();
      }
    } catch (error) {
      if (error?.status == 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      }
    }
  };

  useEffect(() => {
    getSalePersonData();
    getFetchItemSalesData();
  }, [selectedDateRange]);

  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  return (
    <>
      <div className="q-category-main-page">
        <Welcome />
      </div>

      <div className="q-category-main-page">
        {/* Date range for charts */}
        <Grid
          container
          className="box_shadow_div q-attributes-bottom-header"
          justifyContent="space-between"
        >
          <Grid item>
            <div className="mt_card_header q_dashbaord_netsales">
              <h1 className="">View by</h1>
            </div>
          </Grid>
          <Grid item>
            <div className="flex gap-4">
              {["Day", "Week", "Month"].map((type) => (
                <span
                  key={type}
                  className={`single-box-type ${
                    type === activeType ? "active" : ""
                  }`}
                  onClick={() => setActiveType(type)}
                >
                  {type}
                </span>
              ))}
            </div>
          </Grid>
        </Grid>

        {/* Charts */}
        <NetSales activeType={activeType} />

        {/* Date range for table */}
        <div className="box">
          <DateRangeComponent onDateRangeChange={handleDateRangeChange} />
        </div>
        <div className="mb-5">
          {/* Top selling products table */}
          <TopProducts itemSalesList={itemSalesList} />
          {/* Top employees table */}
          <TopEmployees salesByPersonList={salesByPersonList} />
        </div>
      </div>
    </>
  );
};

export default DashboardMain;
