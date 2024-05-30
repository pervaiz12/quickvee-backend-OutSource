import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCouponReportData } from "../../../Redux/features/Reports/CouponReport/CouponReportSlice";
import { useAuthDetails } from "../../../Common/cookiesHelper";

const CouponReportList = (props) => {
  const dispatch = useDispatch();

  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const [CouponReportData, setCouponReportData] = useState([]);
  const CouponReportDataState = useSelector((state) => state.CouponReportList);
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
        dispatch(fetchCouponReportData(data));
      }
    }
  }, [props, dispatch]);

  useEffect(() => {
    if (
      !CouponReportDataState.loading &&
      CouponReportDataState.CouponReportData
    ) {
      setCouponReportData(CouponReportDataState.CouponReportData);
    } else {
      setCouponReportData([]);
    }
  }, [CouponReportDataState.loading, CouponReportDataState.CouponReportData]);

  return (
    <>
      <div className="box">
        <div className="q-daily-report-bottom-report-header">
          <p className="report-title">Date</p>
          <p className="report-title">Coupon Type</p>
          <p className="report-title">Total Coupon Used</p>
          {/* <p className="report-title">Net Tip</p> */}
          {/* <p className="report-title">Total Net Tip</p>  */}
        </div>
        {CouponReportData.length > 0 ? (
          CouponReportData.map((couponData, index) => (
            <div className="q-category-bottom-categories-listing" key={index}>
              <div className="q-category-bottom-categories-single-category">
                <p className="report-title">{couponData.date}</p>
                <p className="report-title">
                  {couponData.coupon_type === "Discount"
                    ? "Direct Discount By App"
                    : couponData.coupon_type}
                </p>
                <p className="report-title">{couponData.total_coupons_used}</p>
                {/* <p className="report-title">${parseFloat(couponData.net_tip).toFixed(2)}</p> */}
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
      </div>
    </>
  );
};

export default CouponReportList;
