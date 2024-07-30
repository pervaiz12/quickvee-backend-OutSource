import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import StoreCreditReportTable from "./StoreCreditReportTable";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import PasswordShow from "../../../Common/passwordShow";
import { fetchStoreCreditReportArr } from "../../../Redux/features/Reports/StoreCreditReport/StoreCreditReportSlice";
import { useDispatch } from "react-redux";

export default function StoreCreditReportMain() {
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  const [storeCreditTableData, setStoreCreditTableData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getStoreCreditReportTableData();
  }, [merchant_id]);
  const getStoreCreditReportTableData = async () => {
    if (merchant_id) {
  
      try {
        let data = {
          merchant_id,
          ...userTypeData,
        };

        if (data) {
          console.log("Merchant")
          await dispatch(fetchStoreCreditReportArr(data)).unwrap();
        }
      } catch (error) {
        console.log(error);
        if (error.status == 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        }
      }
    }
  };
  return (
    <>
      <Grid
        container
        sx={{ padding: 2.5, mt: 3.6 }}
        className="box_shadow_div "
      >
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <h1 style={{ marginBottom: 0 }} className="heading ">
                Store Credit Report
              </h1>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <StoreCreditReportTable />
    </>
  );
}
