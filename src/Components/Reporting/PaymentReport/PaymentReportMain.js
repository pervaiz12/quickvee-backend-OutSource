import React, { useEffect } from "react";
import Grid from "@mui/system/Unstable_Grid/Grid";
import downloadIcon from "../../../Assests/Dashboard/download.svg";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import PaymentReportTable from "./PaymentReportTable";
import VerticalBarChart from "../../Dashboard/VerticalBarChart";
import PaymentReportLogic from "./PaymentReportLogic";

const PaymentReportMain = (props) => {
  const { onDateRangeChange, paymentData } = PaymentReportLogic();
  // Ensure paymentMethods is always an object
  // const paymentMethods = props?.paymentMethods || {};

  // // Safely sum up each field using Object.values and defaulting to 0 if values are missing
  // const totalCollection = Object.values(paymentMethods).reduce((sum, method) => sum + (method?.collected || 0), 0);
  // const totalTransactions = Object.values(paymentMethods).reduce((sum, method) => sum + (method?.transactions || 0), 0);
  // const totalCollectedTransaction = Object.values(paymentMethods).reduce((sum, method) => sum + (method?.collected_transaction || 0), 0);
  // const totalRefundTransaction = Object.values(paymentMethods).reduce((sum, method) => sum + (method?.refund_transaction || 0), 0);

  // // Create the data array for the output
  // const data = [
  //   { name: "collected", popularity: totalCollection },
  //   { name: "transactions", popularity: totalTransactions },
  //   { name: "collected_transaction", popularity: totalCollectedTransaction },
  //   { name: "refund_transaction", popularity: totalRefundTransaction }
  // ];

  // console.log("datatest",data);
  useEffect(() => {
    const paymentMethods = props?.paymentMethods || {};

    console.log("paymentMethods", paymentMethods); // Log to verify data structure

    // Safely sum up each field using Object.values
    const totalCollection = Object.values(paymentMethods).reduce(
      (sum, method) => sum + (method?.collected || 0),
      0
    );
    const totalTransactions = Object.values(paymentMethods).reduce(
      (sum, method) => sum + (method?.transactions || 0),
      0
    );
    const totalCollectedTransaction = Object.values(paymentMethods).reduce(
      (sum, method) => sum + (method?.collected_transaction || 0),
      0
    );
    const totalRefundTransaction = Object.values(paymentMethods).reduce(
      (sum, method) => sum + (method?.refund_transaction || 0),
      0
    );

    // Create the data array
    const data = [
      { name: "collected", popularity: totalCollection },
      { name: "transactions", popularity: totalTransactions },
      { name: "collected_transaction", popularity: totalCollectedTransaction },
      { name: "refund_transaction", popularity: totalRefundTransaction },
    ];

    console.log("datatest", data);
  }, [JSON.stringify(props.paymentMethods)]); // Use deep comparison
  // Use JSON.stringify to detect deep changes

  return (
    <>
      <Grid container sx={{ padding: 2.5, mt: 3.6 }} className="box_shadow_div">
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item sx={{ display: "flex", gap: 2 }}>
              <h1
                style={{ marginBottom: 0 }}
                className="heading content-center whitespace-nowrap"
              >
                Payment Report
              </h1>
            </Grid>

            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                cursor: "pointer",
              }}
            >
              <h1 className="text-[#0A64F9] text-[16px]">Export report</h1>
              <img
                style={{ height: "30px", width: "30px" }}
                src={downloadIcon}
                alt="downloadIcon"
              />
            </Grid>
          </Grid>
        </Grid>
        {/* <VerticalBarChart/> */}
      </Grid>
      <Grid container sx={{ mt: 3.6 }}>
        <Grid item xs={12}>
          <DateRangeComponent onDateRangeChange={onDateRangeChange} />
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 3.6 }}>
        <Grid item xs={6}>
          <div style={{ marginRight: "5px" }}>
            <VerticalBarChart />
          </div>
          {/* <DateRangeComponent onDateRangeChange={onDateRangeChange} /> */}
        </Grid>
        <Grid item xs={6}>
          <div style={{ marginLeft: "5px" }}>
            <VerticalBarChart />
          </div>
          {/* <DateRangeComponent onDateRangeChange={onDateRangeChange} /> */}
        </Grid>
      </Grid>
      <Grid container sx={{ marginY: 3.8 }}>
        <Grid item xs={12}>
          <PaymentReportTable
            paymentData={paymentData}
            // EmployeeFilterData={EmployeeFilterData}
            // loader={loader}
            // merchant_id={merchant_new_id}
            // sortByItemName={sortByItemName}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PaymentReportMain;
