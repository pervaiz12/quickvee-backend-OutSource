import React, { useEffect, useState } from "react";

import { fetchOrderTypeData } from "../../../Redux/features/OrderType/OrderTypeSlice";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Itemdatadetails = ({ data }) => {
  const dispatch = useDispatch();

  const [orderReport, setorderReport] = useState([]);

  const orderReportDataState = useSelector((state) => state.orderTypeList);
  console.log(data.start_date);

  useEffect(() => {
    // Dispatch the action to fetch data when the component mounts
    dispatch(fetchOrderTypeData(data));
  }, [dispatch, data]);

  useEffect(() => {
    if (!orderReportDataState.loading && orderReportDataState.orderTypeData) {
      setorderReport(orderReportDataState.orderTypeData);
    }
  }, [
    orderReportDataState,
    orderReportDataState.loading,
    orderReportDataState.orderTypeData,
  ]);

  if (!data || data.length === 0) {
    return <div className="empty-div">No data available</div>;
  }

  const renderDataTable = () => {
    if (
      orderReport.success === false &&
      orderReport.message === "No data found for the specified criteria"
    ) {
      return <div className="empty-div">No data available</div>;
    } else if (orderReport && orderReport.length >= 1) {
      return (
        <>
          <div className="q-attributes-bottom-detail-section text-center">
            <div className="q-attributes-bottom-attriButes-header text-center">
              <p className="q-employee-item">Name</p>
              <p className="q-employee-in text-center"># Of Payments </p>
              <p className="q-employee-in text-right"> Net Revenue Without Tips</p>
              <p className="q-employee-in text-right"> Tips</p>
              <p className="q-employee-in text-right"> Net Revenue With Tips</p>

              <p className="q-employee-in text-right">Details</p>
            </div>
            {orderReport.map((orderReportDa, index) => (
              <div
                className="q-attributes-bottom-attriButes-listing "
                key={index}
              >
                <div className="q-employee-bottom-attriButes-single-attributes ">
                  <p className="q-employee-item">
                    {orderReportDa.order_method}
                  </p>
                  <p className="q-employee-in">{orderReportDa.total_count}</p>
                  <p className="q-employee-in">
                    {orderReportDa.amt_without_tip}
                  </p>
                  <p className="q-employee-in">{orderReportDa.tip}</p>
                  <p className="q-employee-in">
                    {orderReportDa.amount_with_tip}
                  </p>
                  <Link
                    // to={`/Order`}
                  >
                    <p className="q-employee-in">Details</p>
                  </Link>
                  {/* <Link
                    to={`/Order/close/0/${orderReportDa.order_method}/${data.start_date}/${data.end_date}/${data.order_env}`}
                  >
                    <p className="q-employee-out">Details</p>
                  </Link> */}
                </div>
              </div>
            ))}
          </div>
        </>
      );
    }
  };

  return <>{renderDataTable()}</>;
};

export default Itemdatadetails;
