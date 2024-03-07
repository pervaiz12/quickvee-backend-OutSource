import React, { useEffect, useState } from "react";
import "../../../Styles/EmployeeWorking.css";
import { fetchinstantactivityData } from "../../../Redux/features/InstantActivity/instantactivitySlice";
import { useSelector, useDispatch } from "react-redux";

const MainInstantDetails = ({ data }) => {
  const dispatch = useDispatch();
  const [instantactivity, setinstantactivity] = useState([]);
  const instantactivityDataState = useSelector(
    (state) => state.instantactivity
  );

  useEffect(() => {
    dispatch(fetchinstantactivityData(data));
  }, [dispatch, data]);

  useEffect(() => {
    if (
      !instantactivityDataState.loading &&
      instantactivityDataState.instantactivityData
    ) {
      setinstantactivity(instantactivityDataState.instantactivityData);
    }
  }, [
    instantactivityDataState,
    instantactivityDataState.loading,
    instantactivityDataState.instantactivityData,
  ]);

  if (!data || data.length === 0) {
    return (
      <>
        <div className="box">
          <div className="table_main_area">
            <div className="table_header_sticky">
              <div className="q-attributes-bottom-header">
                <span>Instant PO Activity Report</span>
              </div>
              <div className="table_header">
                <p className="table12">Date</p>
                <p className="table12">Time</p>
                <p className="table10">Source</p>
                <p className="table12">Product Name</p>
                <p className="table12">Variants Name</p>
                <p className="table10">Before Adjust Qty</p>
                <p className="table8">Adjust Qty </p>
                <p className="table8">After Adjust Qty</p>
                <p className="table8">Per Item Cost</p>
                <p className="table8">Total Cost</p>
              </div>
            </div>
            <div className="table_body">
              <div className="q-attributes-bottom-attriButes-listing">
                <div className="q-employee-bottom-attriButes-single-attributes">
                  <p className="q-employee-item">No data available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const renderDataTable = () => {
    // console.log(dailyreport)
    if (
      instantactivity.status === "Failed" &&
      instantactivity.msg === "No. Data found."
    ) {
      return (
        <>
          <div className="box">
            <div className="table_main_area">
              <div className="table_header_sticky">
                <div className="q-attributes-bottom-header">
                  <span>Instant PO Activity Report</span>
                </div>
                <div className="table_header">
                  <p className="table12">Date</p>
                  <p className="table12">Time</p>
                  <p className="table10">Source</p>
                  <p className="table12">Product Name</p>
                  <p className="table12">Variants Name</p>
                  <p className="table10">Before Adjust Qty</p>
                  <p className="table8">Adjust Qty </p>
                  <p className="table8">After Adjust Qty</p>
                  <p className="table8">Per Item Cost</p>
                  <p className="table8">Total Cost</p>
                </div>
              </div>
              <div className="table_body">
                <div className="q-attributes-bottom-attriButes-listing">
                  <div className="q-employee-bottom-attriButes-single-attributes">
                    <p className="q-employee-item">No data available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (instantactivity && instantactivity.length >= 1) {
      return (
        <>
          <div className="box">
            <div className="table_main_area">
              <div className="table_header_sticky">
                <div className="q-attributes-bottom-header">
                  <span>Instant PO Activity Report</span>
                </div>
                <div className="table_header">
                  <p className="table12">Date</p>
                  <p className="table12">Time</p>
                  <p className="table10">Source</p>
                  <p className="table12">Product Name</p>
                  <p className="table12">Variants Name</p>
                  <p className="table10">Before Adjust Qty</p>
                  <p className="table8">Adjust Qty </p>
                  <p className="table8">After Adjust Qty</p>
                  <p className="table8">Per Item Cost</p>
                  <p className="table8">Total Cost</p>
                </div>
              </div>
              <div className="table_body">
                <div className="q-attributes-bottom-attriButes-listing">
                  {instantactivity.map((instantactivity, index) => {
                    const AfterAdjustQty =
                      parseInt(instantactivity.current_qty, 10) +
                      parseInt(instantactivity.qty, 10);
                    const calculatedTotal =
                      parseInt(instantactivity.qty, 10) *
                      parseFloat(instantactivity.price);
                    // console.log(result.a_state)
                    return (
                      <div className="table_row "   key={index}>
                        <p className="table12" style={{ color: '#818181' }}>
                          {new Date(instantactivity.created_at)
                            .toLocaleDateString("en-US", {
                              month: "2-digit",
                              day: "2-digit",
                              year: "numeric",
                            })
                            .split("/")
                            .join("-")}
                        </p>
                        <p className="table12" style={{ color: '#818181' }}>
                          {new Date(
                            instantactivity.created_at
                          ).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })}
                        </p>
                        <p className="table10 txt_ellipsis" style={{ color: '#818181' }}>
                          {instantactivity.emp_name === null ||
                          instantactivity.emp_name === ""
                            ? "Online"
                            : instantactivity.emp_name}
                        </p>
                        <p className="table12 txt_ellipsis" style={{ color: '#818181' }}>
                          {instantactivity.title}
                        </p>
                        <p className="table12 txt_ellipsis" style={{ color: '#818181' }}>
                          {instantactivity.variant}
                        </p>
                        <p className="table10" style={{ color: '#818181' }}>{instantactivity.current_qty}</p>
                        <p className="table8" style={{ color: '#818181' }}>{instantactivity.qty}</p>
                        <p className="table8" style={{ color: '#818181' }}>{AfterAdjustQty}</p>
                        <p className="table8" style={{ color: '#818181' }}>{instantactivity.price}</p>
                        <p className="table8" style={{ color: '#818181' }}>
                          {calculatedTotal % 1 !== 0
                            ? calculatedTotal.toFixed(2)
                            : calculatedTotal}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return <>{renderDataTable()}</>;
};

export default MainInstantDetails;
