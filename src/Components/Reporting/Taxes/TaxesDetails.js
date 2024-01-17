import React, { useEffect, useState } from "react";

import { fetchtaxesreportData } from "../../../Redux/features/TaxesReport/taxesreportSlice";

import { useSelector, useDispatch } from "react-redux";
const TaxesDetails = ({ data }) => {
  const dispatch = useDispatch();

  const [taxesreport, settaxesreport] = useState([]);

  const taxesreportDataState = useSelector((state) => state.taxesreport);

  useEffect(() => {
    // Dispatch the action to fetch data when the component mounts
    dispatch(fetchtaxesreportData(data));
  }, [dispatch, data]);

  useEffect(() => {
    if (!taxesreportDataState.loading && taxesreportDataState.taxesreportData) {
      settaxesreport(taxesreportDataState.taxesreportData);
    }
  }, [
    taxesreportDataState,
    taxesreportDataState.loading,
    taxesreportDataState.taxesreportData,
  ]);

  if (!data || data.length === 0) {
    return <div className="empty-div">No data available</div>;
  }

  const renderDataTable = () => {
    if (
      taxesreport.status === "Failed" &&
      taxesreport.msg === "No. Data found."
    ) {
      return <div className="empty-div">No data available</div>;
    } else if (taxesreport.data1 || taxesreport.data2) {
      return (
        <>
          <div className="q-attributes-bottom-detail-section">
            <div className="q-attributes-bottom-attriButes-header text-center">
              <p className="q-employee-item">Tax or Fee</p>
              <p className="q-employee-in">Tax Rate or Fee</p>
              <p className="q-employee-in"> Tax or Fee Refunded</p>
              <p className="q-employee-in"> Tax or Fee Collected</p>
            </div>

            {Object.keys(taxesreport.data1.final_arr).map((key, index) => (
              <div
                className="q-attributes-bottom-attriButes-listing"
                key={index}
              >
                <div className="q-employee-bottom-attriButes-single-attributes">
                  <p className="q-employee-item">
                    {key === "Sale Tax" ? "Sales Tax" : key}
                  </p>
                  <p className="q-employee-in">
                    {taxesreport.data3.tax_rate[key] &&
                    taxesreport.data3.tax_rate[key].percent
                      ? `${taxesreport.data3.tax_rate[key].percent}%`
                      : "N/A"}
                  </p>
                  {taxesreport.data2.final_arr2[key] ? (
                    <p className="q-employee-in">
                      ${taxesreport.data2.final_arr2[key].toFixed(2)}
                    </p>
                  ) : (
                    <p className="q-employee-in">$0.00</p>
                  )}
                  <p className="q-employee-in">
                    ${taxesreport.data1.final_arr[key].toFixed(2)}
                  </p>
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

export default TaxesDetails;
