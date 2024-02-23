import React, { useEffect, useState } from "react";
import { fetchdailyreportData } from "../../../Redux/features/DailyReport/dailyreportSlice";

import { useSelector, useDispatch } from "react-redux";

const DailyReportList = ({data}) => {

  const dispatch = useDispatch();

  const [dailyreport, setdailyreport] = useState([]);

  const dailyreportDataState = useSelector((state) => state.dailyreport);

  useEffect(() => {
    // Dispatch the action to fetch data when the component mounts
    dispatch(fetchdailyreportData(data));
  }, [dispatch, data]);

  useEffect(() => {
    if (!dailyreportDataState.loading && dailyreportDataState.dailyreportData) {
      setdailyreport(dailyreportDataState.dailyreportData);
    }
  }, [
    dailyreportDataState,
    dailyreportDataState.loading,
    dailyreportDataState.dailyreportData,
  ]);

  if (!data || data.length === 0) {
    return <div className="empty-div">No data available</div>;
  }

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options);
    return formattedDate;
  };

  const renderDataTable = () => {
    // console.log(dailyreport)
    if (
      dailyreport.status === "Failed" &&
      dailyreport.msg === "No. Data found."
    ) {
      return <div className="empty-div">No data available</div>;
    } else if (dailyreport && dailyreport.length >= 1) {
      const totalAmt = dailyreport.reduce(
        (total, report) => total + parseFloat(report.amt),
        0
      );
      return (
        <>
        <div className="box">
          <div className="q-daily-report-bottom-report-header">
            <p className="report-sort">Date</p>
            <p className="report-title">Total</p>
          </div>
          {dailyreport.map((dailyreport, index) => (
            <div className="q-category-bottom-categories-listing" key={index}>
              <div className="q-category-bottom-categories-single-category">
                <p className="report-sort">{formatDate(dailyreport.merchant_time)}</p>
                <p className="report-title">${dailyreport.amt}</p>
              </div>
            </div>
          ))}
          <div className="q-category-bottom-report-listing">
            <div className="q-category-bottom-categories-single-category">
              <p className="report-sort">Grand Total</p>
              <p className="report-title">${totalAmt.toFixed(2)}</p>
            </div>
          </div>
          </div>
        </>
      );
    }
  };

  return <>{renderDataTable()}</>;
};

export default DailyReportList;