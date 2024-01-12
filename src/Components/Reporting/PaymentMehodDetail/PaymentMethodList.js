import React, { useEffect, useState } from "react";
import { fetchPaymentMethodReportData } from "../../../Redux/features/PaymentMethodReport/PaymentMethodSlice";

import { useSelector, useDispatch } from "react-redux";

const PaymentMethodList = ({data}) => {

  const dispatch = useDispatch();

  const [paymentReport, setpaymentReport] = useState([]);

  const paymentReportDataState = useSelector((state) => state.paymentDetailReport);

  useEffect(() => {
    // Dispatch the action to fetch data when the component mounts
    dispatch(fetchPaymentMethodReportData(data));
  }, [dispatch, data]);

  useEffect(() => {
    if (!paymentReportDataState.loading && paymentReportDataState.paymentMethodData) {
        setpaymentReport(paymentReportDataState.paymentMethodData);
    }
  }, [
    paymentReportDataState,
    paymentReportDataState.loading,
    paymentReportDataState.paymentMethodData,
  ]);


  if (!data || data.length === 0) {
    return <div className="empty-div">No data available</div>;
  }

  const myArray = Object.keys(paymentReport).map(key => ({
    card_type: key,
    amt: paymentReport[key]
  }));
  


  const renderDataTable = () => {
    
    
    if (
        paymentReport.status === "Failed" &&
        paymentReport.msg === "No Data found."
    ) {
        //  debugger;
      return <div className="empty-div">No data available</div>;
    } else if (myArray && myArray.length >= 1) {
        
      return (
        <>
          <div className="q-daily-report-bottom-report-header">
            <p className="report-sort">Card type</p>
            <p className="report-title">Total</p>
          </div>
          {myArray.map((paymentData, index) => (
            <div className="q-category-bottom-categories-listing" key={index}>
              <div className="q-category-bottom-categories-single-category">
           
                <p className="report-title">{paymentData.card_type}</p>
                <p className="report-title">  {typeof paymentData.amt === 'number' ? `$${Number(paymentData.amt).toFixed(2)}` : 'N/A'}</p>
                {/* <p className="report-title">${paymentData.amt.toFixed(2)}</p> */}
              </div>
            </div>
          ))}

        </>
      );
    }
  };

  return <>{renderDataTable()}</>;
};

export default PaymentMethodList;
