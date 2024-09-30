import React, { useEffect, useState } from "react";
import Welcome from "./Welcome";
import { Grid } from "@mui/material";
import NetSales from "./NetSales";
import { useSelector, useDispatch } from "react-redux";
import { useAuthDetails } from "./../../Common/cookiesHelper";
import { ProductsSold } from "./TopProducts";
import { TopEmployees } from "./TopEmployees";
import PasswordShow from "../../Common/passwordShow";
import { fetchSalePersonData } from "../../Redux/features/SalesByPerson/SalesByPersonSlice";
import { fetchItemSalesData } from "../../Redux/features/Reports/ItemSales/ItemSalesSlice";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
import { getDefaultDateRange } from "../../Constants/utils";

const DashboardMain = () => {
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  const dispatch = useDispatch();

  const [activeType, setActiveType] = useState("Month");

  const [selectedDateRange, setSelectedDateRange] = useState({
    start_date: null,
    end_date: null,
  });

  const outletList = [
    {
      id: "0",
      title: "Main Outlet",
    },
  ];

  // for Top Employees
  const salesByPersonList = useSelector((state) => state.SalesByPersonList);

  // for Top Products
  const itemSalesList = useSelector((state) => state.ItemSalesReportList);

  // setting dates
  useEffect(() => {
    const dates = getDefaultDateRange(activeType, new Date());
    // console.log("dates main dashboard: ", dates);
    const allDates = dates && dates.date_range && dates.date_range?.split(",");
    const firstDate = allDates && allDates[0];
    const endDate = allDates && allDates[allDates.length - 1];

    setSelectedDateRange({
      start_date: firstDate && firstDate?.split("_")[0],
      end_date: endDate && endDate?.split("_")[1],
    });
  }, [activeType]);

  // calling API for Products & Sales persons
  useEffect(() => {
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

        await dispatch(fetchSalePersonData(data)).unwrap();
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
        await dispatch(fetchItemSalesData(data)).unwrap();
      } catch (error) {
        if (error?.status == 401 || error?.response?.status === 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        } else if (error?.status == "Network Error") {
          getNetworkError();
        }
      }
    };
    getSalePersonData();
    getFetchItemSalesData();
  }, [selectedDateRange]);

  const handleOptionClick = () => {};

  return (
    <>
      <div className="q-category-main-page">
        <Welcome />
      </div>

      <div className="q-category-main-page">
        <Grid
          container
          className="box_shadow_div q-attributes-bottom-header"
          justifyContent="start"
          gap={3}
        >
          <Grid item>
            <div className="q-add-categories-single-input">
              <label for="description">View</label>
              <div className="flex flex-wrap gap-4 mt-2">
                {["Day", "Week", "Month"].map((type) => (
                  <span
                    key={type}
                    className={`single-box-type ${
                      type === activeType ? "active" : ""
                    }`}
                    onClick={() => setActiveType(() => type)}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <label style={{ whiteSpace: "nowrap" }}>Outlet</label>
            <div className="mt-2">
              <SelectDropDown
                // heading={"All"}
                title={"title"}
                listItem={outletList}
                // selectedOption={productByImages}
                selectedOption={"Main Outlet"}
                onClickHandler={handleOptionClick}
                dropdownFor={"outlets"}
                // disabled={loading}
              />
            </div>
          </Grid>
        </Grid>

        {/* Charts */}
        <NetSales activeType={activeType} merchantId={merchant_id} />

        {/* Tables */}
        <div className="mb-5">
          {/* Top selling products table */}
          <ProductsSold itemSalesList={itemSalesList} />
          {/* Top employees table */}
          <TopEmployees salesByPersonList={salesByPersonList} />
        </div>
      </div>
    </>
  );
};

export default DashboardMain;
