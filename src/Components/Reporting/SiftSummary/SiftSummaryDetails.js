import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchshiftsummaryData } from "../../../Redux/features/Reports/ShiftSummary/ShiftSummarySlice";

const SiftSummaryDetails = (props) => {
  const dispatch = useDispatch();
  const [allshiftsummary, setAllShiftSummary] = useState([]);
  const allshiftsummaryDataState = useSelector((state) => state.ShiftSummarylist);

  useEffect(() => {
    if (props && props.selectedDateRange) {
      let data = {
        merchant_id: "MAL0100CA",
        start_date: props.selectedDateRange.start_date,
        end_date: props.selectedDateRange.end_date,
        shift_assign: props.SelectEmpListData,
      };
      if (data) {
        dispatch(fetchshiftsummaryData(data));
      }
    }
  }, [props]);

     


  useEffect(() => {
    if (!allshiftsummaryDataState?.loading && allshiftsummaryDataState?.shiftsummaryData) {
      setAllShiftSummary(allshiftsummaryDataState.shiftsummaryData);
    }
  }, [allshiftsummaryDataState]);
  console.log(allshiftsummary)

  return (
    <>
      <div className="box">
        <div className="q-daily-report-bottom-report-header">
          <p className="report-sort">Cashier/Station Name</p>
          <p className="report-sort">Open Time</p>
          <p className="report-sort">Close Time</p>
          <p className="report-sort">Open Drawer ($)</p>
          <p className="report-sort">Total Sale ($)</p>
          <p className="report-sort">Total Refund ($)</p>
          <p className="report-sort">Total Tip ($)</p>
          <p className="report-sort">Total Vendor Payout ($)</p>
          <p className="report-sort">Cash Drop ($)</p>
          <p className="report-sort">Total Cash Sale ($)</p>
          <p className="report-sort">Total Debit+Credit Sale ($)</p>
          <p className="report-sort">Expected Cash ($)</p>
          <p className="report-sort">Drawer Over/Short ($)</p>
          <p className="report-sort">Actual Cash Deposited ($)</p>
        </div>
        {allshiftsummary && Object.keys(allshiftsummary).map((shiftData, index) => (
     
          <div key={index} className="q-category-bottom-categories-listing">
              
              {shiftData.map((deviceData, index1) => (
          
              <div key={index1} className="q-category-bottom-categories-single-category">
             
                {deviceData.map((shifttable, innerIndex) => (
                  <div key={innerIndex}>
                <p className="report-sort">{shifttable.device_name}</p>
                <p className="report-sort">{shifttable.open_time}</p>
                <p className="report-sort">{shifttable.close_time}</p>
                <p className="report-sort">{shifttable.open_drawer}</p>
                <p className="report-sort">{shifttable.total_sale}</p>
                <p className="report-sort">{shifttable.total_refund}</p>
                <p className="report-sort">{shifttable.total_tip}</p>
                <p className="report-sort">{shifttable.total_vendor_payout}</p>
                <p className="report-sort">{shifttable.cash_drop}</p>
                <p className="report-sort">{shifttable.total_cash_sale}</p>
                <p className="report-sort">{shifttable.total_debit_credit_sale}</p>
                <p className="report-sort">{shifttable.expected_cash}</p>
                <p className="report-sort">{shifttable.drawer_over_short}</p>
                <p className="report-sort">{shifttable.actual_cash_deposited}</p>
              </div>
               ))}
              </div>
        
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default SiftSummaryDetails;
