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
        <div className="q-attributes-bottom-header-sticky">
          <div className="q-attributes-bottom-header">
            <span>Instant PO Activity Report</span>
          </div>

          <div className="q-attributes-bottom-attriButes-header text-center" style={{borderRadius:"unset"}}>
            <p className="q-employee-item ">Date</p>
            <p className="q-employee-in ">Time </p>
            <p className="q-employee-in ">Source</p>
            <p className="q-employee-in">Product Name</p>
            <p className="q-employee-in">Variants Name</p>
            <p className="q-employee-out">Before Adjust Qty</p>
            <p className="q-employee-worked "> Adjust Qty </p>
            <p className="q-catereport-break">After Adjust Qty</p>
            <p className="q-catereport-break">Per Item Cost</p>
            <p className="q-catereport-break">Total Cost</p>
          </div>
          <div className="q-attributes-bottom-attriButes-listing">
            <div className="q-employee-bottom-attriButes-single-attributes">
              <p className="q-employee-item">No data available</p>
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
          <div className="q-attributes-bottom-header-sticky">
            <div className="q-attributes-bottom-header">
              <span>Instant PO Activity Report</span>
            </div>
            <div className="q-attributes-bottom-attriButes-header text-center">
              <p className="q-employee-item ">Date</p>
              <p className="q-employee-in  ">Time </p>
              <p className="q-employee-in  ">Source</p>
              <p className="q-employee-in ">Product Name</p>
              <p className="q-employee-in ">Variants Name</p>
              <p className="q-employee-out ">Before Adjust Qty</p>
              <p className="q-employee-worked "> Adjust Qty </p>
              <p className="q-catereport-break ">After Adjust Qty</p>
              <p className="q-catereport-break ">Per Item Cost</p>
              <p className="q-catereport-break ">Total Cost</p>
            </div>
            <div className="q-attributes-bottom-attriButes-listing">
              <div className="q-employee-bottom-attriButes-single-attributes">
                <p className="q-employee-item">No data available</p>
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
          <div className="q-attributes-bottom-detail-section">
            <div className="q-attributes-bottom-header-sticky">
              <div className="q-attributes-bottom-header">
                <span>Instant PO Activity Report</span>
              </div>
              <div className="q-attributes-bottom-attriButes-header text-center">
                <p className="q-employee-item ">Date</p>
                <p className="q-employee-in ">Time </p>
                <p className="q-employee-in ">Source</p>
                <p className="q-employee-in ">Product Name</p>
                <p className="q-employee-in ">Variants Name</p>
                <p className="q-employee-out ">Before Adjust Qty</p>
                <p className="q-employee-worked "> Adjust Qty </p>
                <p className="q-catereport-break ">After Adjust Qty</p>
                <p className="q-catereport-break ">Per Item Cost</p>
                <p className="q-catereport-break ">Total Cost</p>
              </div>
            </div>
          </div>
          </div>
          {instantactivity.map((instantactivity, index) => {
            const AfterAdjustQty =
              parseInt(instantactivity.current_qty, 10) +
              parseInt(instantactivity.qty, 10);
            const calculatedTotal =
              parseInt(instantactivity.qty, 10) *
              parseFloat(instantactivity.price);

            return (
              <div className="box">
              <div
                className="q-attributes-bottom-attriButes-listing "
                key={index}
              >
                <div className="q-employee-bottom-attriButes-single-attributes ">
                  <p className="q-employee-item ">
                    {new Date(instantactivity.created_at).toLocaleDateString(
                      "en-US",
                      {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </p>
                  <p className="q-employee-in">
                    {new Date(instantactivity.created_at).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      }
                    )}
                  </p>
                  <p className="q-employee-in">
                    {instantactivity.emp_name === null ||
                    instantactivity.emp_name === ""
                      ? "Online"
                      : instantactivity.emp_name}
                  </p>
                  <p className="q-employee-in">{instantactivity.title}</p>
                  <p className="q-employee-in">{instantactivity.variant}</p>
                  <p className="q-employee-out">
                    {instantactivity.current_qty}
                  </p>
                  <p className="q-employee-worked">{instantactivity.qty}</p>
                  <p className="q-employee-out">{AfterAdjustQty}</p>
                  <p className="q-catereport-break">{instantactivity.price}</p>
                  <p className="q-catereport-break">
                    {calculatedTotal % 1 !== 0
                      ? calculatedTotal.toFixed(2)
                      : calculatedTotal}
                  </p>
                </div>
              </div>
              </div>
            );
          })}
        </>
      );
    }
  };

  return <>{renderDataTable()}</>;
};

export default MainInstantDetails;
