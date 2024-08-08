import React, { useEffect, useState } from "react";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import { Grid } from "@mui/material";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { useDispatch } from "react-redux";
import { fetchNewCustomersAddedReportArr } from "../../../Redux/features/Reports/NewCustomersAddedReport/NewCustomersAddedReportSlice";
import PasswordShow from "../../../Common/passwordShow";
import NewCustomersAddedReportTable from "./NewCustomersAddedReportTable";

export default function NewCustomersAddedReportMain() {
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const { LoginGetDashBoardRecordJson, userTypeData } = useAuthDetails();
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const dispatch = useDispatch();
  const onDateRangeChange = (date) => {
    setStartDate(date.start_date);
    setEndDate(date.end_date);
  };

  useEffect(() => {
    getNewCustomersAddedReport();
  }, [merchant_id, startDate, endDate]);
  const getNewCustomersAddedReport = async () => {
    try {
      const data = {
        start_date: startDate,
        end_date: endDate,
        merchant_id,
        ...userTypeData,
      };
      if (data) {

        startDate &&
          endDate &&
          (await dispatch(fetchNewCustomersAddedReportArr(data)).unwrap());
      }
    } catch (error) {
      console.log(error);
      if (error.status == 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      }
    }
  };
  return (
    <>
      <Grid container sx={{ pt: 2.5 }}>
        <Grid item xs={12}>
        <Grid container  className="box_shadow_div " sx={{ p:2.5 }}>
            <Grid item xs={12}>
              <h1 style={{ marginBottom: 0 }} className="heading ">
                New Customers Added Report
              </h1>
            </Grid>
          </Grid>
          <DateRangeComponent onDateRangeChange={onDateRangeChange} />
        </Grid>
      </Grid>
      <NewCustomersAddedReportTable />
    </>
  );
}
