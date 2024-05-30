import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTipReportData } from "../../../Redux/features/Reports/TipReport/TipReportSlice";
import { useAuthDetails } from "../../../Common/cookiesHelper";

const TipReportList = (props) => {
  const dispatch = useDispatch();
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const [tipReportData, setTipReportData] = useState([]);
  const tipReportDataState = useSelector((state) => state.TipReportList);
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  useEffect(() => {
    if (props && props.selectedDateRange) {
      const startDateData = props.selectedDateRange.start_date;
      const endDateData = props.selectedDateRange.end_date;

      let data = {
        merchant_id,
        start_date: startDateData,
        end_date: endDateData,
        ...userTypeData,
      };

      if (data) {
        dispatch(fetchTipReportData(data));
      }
    }
  }, [props, dispatch]);

  useEffect(() => {
    if (!tipReportDataState.loading && tipReportDataState.TipReportData) {
      setTipReportData(tipReportDataState.TipReportData);
    } else {
      setTipReportData([]);
    }
  }, [tipReportDataState.loading, tipReportDataState.TipReportData]);

  let totalNetTip = 0;

  tipReportData.forEach((tipData) => {
    totalNetTip += parseFloat(tipData.net_tip);
  });

  return (
    <>
      <div className="box">
        <div className="q-daily-report-bottom-report-header">
          <p className="report-title">Employee ID</p>
          <p className="report-title">First Name</p>
          <p className="report-title">Last Name</p>
          <p className="report-title">Net Tip</p>
          {/* <p className="report-title">Total Net Tip</p>  */}
        </div>
        {tipReportData.length > 0 ? (
          tipReportData.map((tipData, index) => (
            <div className="q-category-bottom-categories-listing" key={index}>
              <div className="q-category-bottom-categories-single-category">
                <p className="report-title">{tipData.employee_id}</p>
                <p className="report-title">{tipData.f_name}</p>
                <p className="report-title">{tipData.l_name}</p>
                <p className="report-title">
                  ${parseFloat(tipData.net_tip).toFixed(2)}
                </p>
                {/* <p className="report-title">{totalNetTip.toFixed(2)}</p>  */}
              </div>
            </div>
          ))
        ) : (
          <div className="q-category-bottom-categories-listing">
            <div className="q-category-bottom-categories-single-category">
              <p className="report-title">No data found</p>
            </div>
          </div>
        )}
        <div className="q-category-bottom-categories-listing">
          <div className="q-category-bottom-categories-single-category">
            <p className="report-title"></p>
            <p className="report-title"></p>
            {/* <p className="report-title"></p> */}
            <p className="report-title">Grand Total:</p>
            <p className="report-title">${totalNetTip.toFixed(2)}</p>
          </div>
        </div>
        <br></br>
      </div>
    </>
  );
};

export default TipReportList;
