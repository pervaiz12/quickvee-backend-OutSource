import React, { useEffect, useState } from "react";
import { fetchcurrentInventoryreportData } from "../../../Redux/features/CurrentInventoryValue/currentInventoryValueSlice";
import { useSelector, useDispatch } from "react-redux";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { Grid } from "@mui/material";
import { priceFormate } from "../../../hooks/priceFormate";
import Skeleton from "react-loading-skeleton";

const CurrentInventoryValue = () => {
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const [currentInventory, setcurrentInventory] = useState([]);
  const currentInventoryreportDataState = useSelector(
    (state) => state.currentInventoryreport
  );
  const dispatch = useDispatch();
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = {
          merchant_id,
          ...userTypeData,
        };
        if (data) {
          dispatch(fetchcurrentInventoryreportData(data));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (
      !currentInventoryreportDataState.loading &&
      currentInventoryreportDataState.currentInventoryreportData
    ) {
      setcurrentInventory(
        currentInventoryreportDataState.currentInventoryreportData
      );
    }
  }, [
    currentInventoryreportDataState.loading,
    currentInventoryreportDataState.currentInventoryreportData,
  ]);

  const formatNumber = (value) => {
    const floatValue = parseFloat(value);
    const formattedValue = floatValue.toFixed(2);
    return floatValue % 1 === 0
      ? String(parseFloat(floatValue))
      : formattedValue;
  };

  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container sx={{ padding: 2.5 }}>
            <Grid item xs={12}>
              <div className="q_details_header"> Current Inventory Report</div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <div className="bg-white p-4 shadow-md rounded-lg opacity-100  h-30">
            <div className="font-normal  tracking-normal Admin_std">
              Total Quantity
            </div>
            <div className="text-[20px] font-bold mt-4 common-font-bold">
              {/* {priceFormate(formatNumber(currentInventory.final_quantity))} */}
              { currentInventory.final_quantity ?  priceFormate(formatNumber(currentInventory.final_quantity)) : <Skeleton /> }
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className="bg-white p-4 shadow-md rounded-lg opacity-100  h-30">
            <div className="font-normal  tracking-normal Admin_std">
              Total Selling Price
            </div>
            <div className="text-[20px] font-bold mt-4 common-font-bold">
              {/* $ {priceFormate(formatNumber(currentInventory.total_sale_price))} */}
              { currentInventory.total_sale_price ?  "$"+priceFormate(formatNumber(currentInventory.total_sale_price)) : <Skeleton /> }
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className="bg-white p-4 shadow-md rounded-lg opacity-100  h-30">
            <div className="font-normal  tracking-normal Admin_std">
              Total Cost Per Item
            </div>
            <div className="text-[20px] font-bold mt-4 common-font-bold">
              {/* $ {priceFormate(formatNumber(currentInventory.total_cpi_price))} */}
              { currentInventory.total_cpi_price ?  "$"+priceFormate(formatNumber(currentInventory.total_cpi_price)) : <Skeleton /> }
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default CurrentInventoryValue;
