import React from "react";
import PaymentCalDetails from "./PaymentCalDetails";

const OrderStatusSummary = ({ OrderSummaryData }) => {
  

  const CouponCodeData =
    OrderSummaryData &&
    OrderSummaryData.order_detail &&
    OrderSummaryData.order_detail.coupon_code
      ? JSON.parse(OrderSummaryData.order_detail.coupon_code)
      : null;
  

  const orderDetail = OrderSummaryData.order_detail || {};
  const FinalTotal =
    (parseFloat(orderDetail.amt) || 0) -
    (parseFloat(orderDetail.refund_amount) || 0);

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const mainDivStyle = {
    display: "flex",
  };
  const mainPTag = {
    backgroundColor: "rgb(227 227 227)",
    fontSize: "14px",
    padding: "2px 10px",
    borderRadius: "15px",
    marginRight: "15px",
  };

  return (
    <>
      
      













































































































































































































































































































    
      <PaymentCalDetails />
      
      
    </>
  );
};

export default OrderStatusSummary;
