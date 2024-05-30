import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderRefundData } from "../../../Redux/features/Reports/OrderRefundReport/OrderRefundReportSlice";
import { useAuthDetails } from "../../../Common/cookiesHelper";

const OrderRefundReportList = (props) => {
  // console.log(props)
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const dispatch = useDispatch();
  const [allOrderData, setOrderData] = useState("");
  const AllOrderRefundData = useSelector((state) => state.OrderRefundList);
  // console.log(AllOrderRefundData)
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  useEffect(() => {
    if (props && props.selectedDateRange) {
      // const StartDateData = props.selectedDateRange.startDate.toISOString().split('T')[0];
      // const EndDateData = props.selectedDateRange.endDate.toISOString().split('T')[0];

      const StartDateData = props.selectedDateRange.start_date;
      const EndDateData = props.selectedDateRange.end_date;

      let data = {
        merchant_id,
        start_date: StartDateData,
        end_date: EndDateData,
        // category_id: props.categoryId,
        reason_name: props.reasonTitle,
        ...userTypeData,
      };
      console.log(data);
      if (data) {
        dispatch(fetchOrderRefundData(data));
      }
    }
  }, [props]);

  useEffect(() => {
    if (!AllOrderRefundData.loading && AllOrderRefundData.OrderRefundData) {
      console.log(AllOrderRefundData.OrderRefundData);
      setOrderData(AllOrderRefundData.OrderRefundData);
    } else {
      setOrderData("");
    }
  }, [
    AllOrderRefundData,
    AllOrderRefundData.loading,
    AllOrderRefundData.OrderRefundData,
  ]);

  const calculateGrandTotal = (allOrderData, key) => {
    // Calculate the grand total for a specific key in the dataset
    return allOrderData.reduce(
      (total, order) => total + parseFloat(order[key]),
      0
    );
  };

  const isAllOrderDataValid =
    Array.isArray(allOrderData) && allOrderData.length > 0;

  return (
    <>
      {isAllOrderDataValid && (
        <div className="box">
          <div className="q-daily-report-bottom-report-header">
            <p className="report-sort">Order ID</p>
            <p className="report-sort">Date</p>
            <p className="report-sort">Employee</p>
            <p className="report-sort">Reason</p>
            <p className="report-sort">Debit/Credit</p>
            <p className="report-sort">Cash</p>
            <p className="report-sort">LP</p>
            <p className="report-sort">SC</p>
            <p className="report-sort">NCA</p>
            <p className="report-sort">TIP</p>
            <p className="report-sort">Total</p>
            {/* <p className="report-sort">NCA</p> */}
          </div>
        </div>
      )}

      {isAllOrderDataValid ? (
        <>
          {allOrderData.map((CheckData, index) => {
            const formattedDate = new Date(
              CheckData.created_at
            ).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });

            function formatAmount(value) {
              // Convert empty or undefined values to 0
              const formattedValue = value || 0;

              // Format the number to have two decimal places
              const roundedValue = Number(formattedValue).toFixed(2);

              return roundedValue;
            }

            // const formattedPrice = parseFloat(CheckData.debit_amt).toFixed(2);
            // const formattedRefundQty = parseFloat(CheckData.refund_qty).toFixed(2);

            return (
              <div className="box">
                <div
                  key={index}
                  className="q-category-bottom-categories-listing"
                >
                  <div className="q-category-bottom-categories-single-category">
                    <p className="report-title">{CheckData.order_id}</p>
                    <p className="report-title">{formattedDate}</p>
                    <p className="report-title">{CheckData.employee}</p>
                    <p className="report-title">{CheckData.reason}</p>
                    <p className="report-title">
                      ${formatAmount(CheckData.debit_amt)}
                    </p>
                    <p className="report-title">
                      ${formatAmount(CheckData.cash_amt)}
                    </p>
                    <p className="report-title">
                      ${formatAmount(CheckData.loyalty_point_amt)}
                    </p>
                    <p className="report-title">
                      ${formatAmount(CheckData.store_credit_amt)}
                    </p>
                    <p className="report-title">
                      ${formatAmount(CheckData.nca_amt)}
                    </p>
                    <p className="report-title">
                      ${formatAmount(CheckData.tip_amt)}
                    </p>
                    <p className="report-title">
                      ${formatAmount(CheckData.amount)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Grand Total Row */}
          <div className="box">
            <div className="q-category-bottom-categories-listing">
              <div className="q-category-bottom-categories-single-category">
                <p className="report-title"></p>
                <p className="report-title"></p>
                <p className="report-title">Grand Total</p>
                {/* <p className="report-title">{parseFloat(calculateGrandTotal(allOrderData, 'refund_qty')).toFixed(2)}</p> */}
                <p className="report-title">
                  $
                  {parseFloat(
                    calculateGrandTotal(allOrderData, "amount")
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="box">
          <div className="q-category-bottom-categories-single-category">
            <p>No data found</p>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderRefundReportList;
