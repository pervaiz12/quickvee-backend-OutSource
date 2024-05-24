import React, { useEffect, useState } from "react";
import MainHeaderOrder from "../MainOrderSumaaryDetails/MainHeaderOrder";
import OrderStatusSummary from "./OrderStatusSummary";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderData } from "../../../../Redux/features/OrderSummary/OrderSummarySlice";
import { useLocation } from "react-router-dom";

const OrderSummaryDetails = () => {
  const location = useLocation();
  const order_id = location.pathname.replace(
    "/store-reporting/order-summary/",
    ""
  );
  // console.log(order_id);
  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      merchant_id: "MAL0100CA",
      order_id: order_id,
    };
    if (data) {
      dispatch(fetchOrderData(data));
    }
  }, []);

  const [OrderSummaryData, setOrderSummaryData] = useState("");
  const [MerchantDetailsData, setMerchantDetailsData] = useState("");
  const [ShowOrderMethod, setShowOrderMethod] = useState("");
  const AllOrderSummaryDataState = useSelector(
    (state) => state.orderSummeryList
  );
  useEffect(() => {
    if (
      !AllOrderSummaryDataState.loading &&
      AllOrderSummaryDataState.OrderData
    ) {
      // console.log(AllOrderSummaryDataState.OrderData)
      setOrderSummaryData(AllOrderSummaryDataState.OrderData);
      setMerchantDetailsData(
        AllOrderSummaryDataState.OrderData.merchant_details
      );
    }
  }, [
    AllOrderSummaryDataState,
    AllOrderSummaryDataState.loading,
    AllOrderSummaryDataState.OrderData,
  ]);

  useEffect(() => {
    if (
      OrderSummaryData &&
      OrderSummaryData.order_detail &&
      OrderSummaryData.order_detail.order_method
    ) {
      setShowOrderMethod(OrderSummaryData.order_detail.order_method);
    }
  }, [OrderSummaryData]);

  return (
    <>
      <MainHeaderOrder
        MerchantDetailsData={MerchantDetailsData}
        ShowOrderMethod={ShowOrderMethod}
      />
      <div className="q-order-main-page mx-14">
        <OrderStatusSummary OrderSummaryData={OrderSummaryData} />
      </div>
    </>
  );
};

export default OrderSummaryDetails;
