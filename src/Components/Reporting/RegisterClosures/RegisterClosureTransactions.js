import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import leftArrow from "../../../Assests/Dashboard/Left.svg";
import { formatDateTime } from "../../../Constants/utils";
import RegisterClosureTransactionsTable from "./RegisterClosureTransactionsTable";
import StationStatus from "./StationStatus";
import {
  BASE_URL,
  GET_SHIFT_SUMMARY_REPORT_ORDER_DETAILS,
} from "../../../Constants/Config";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import axios from "axios";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
import NoDataFound from "../../../reuseableComponents/NoDataFound";

export default function RegisterClosureTransactions() {
  const [RegisterClosureTransactions, setRegisterClosureTransactions] =
    useState({ arr: [], status: true });
  const location = useLocation();
  const { state } = location;
  const { LoginGetDashBoardRecordJson, userTypeData } = useAuthDetails();
  const merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  const [loading, setLoading] = useState(false);
  const handleViewFullDetails = async () => {
    if (Object.keys(state).length > 0) {
      try {
        const data = {
          shift_start_date: state?.in_time,
          shift_end_date: state?.out_time,
          merchant_id,
          ...userTypeData,
        };
        const { token, ...dataNew } = data;
        const response = await axios.post(
          BASE_URL + GET_SHIFT_SUMMARY_REPORT_ORDER_DETAILS,
          dataNew,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        if (response.data.result.length > 0) {
          setRegisterClosureTransactions({
            arr: response.data.result,
            status: true,
          });
        } else {
          setRegisterClosureTransactions({
            arr: [],
            status: false,
          });
        }
      } catch (error) {}
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    handleViewFullDetails();
  }, []);
  return (
    <>
      <Grid container sx={{ padding: 2.5, mt: 1.5 }}>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Link to={-1} className="flex items-center gap-1">
                <img
                  src={leftArrow}
                  alt="leftArrow"
                  style={{ height: 30, width: 30 }}
                />
                <p className="heading" style={{ marginBottom: 0 }}>
                  Register Closures Transactions
                </p>
              </Link>
            </Grid>
          </Grid>
        </Grid>

        <StationStatus state={state} />

        <Grid container className="box_shadow_div" sx={{ mt: 0 }}>
          {console.log(
            "loading",
            loading,
            "RegisterClosureTransactions.status",
            RegisterClosureTransactions.status,
            "!RegisterClosureTransactions?.arr?.length",
            !RegisterClosureTransactions?.arr?.length
          )}
          {loading ||
          (RegisterClosureTransactions.status &&
            !RegisterClosureTransactions?.arr?.length) ? (
            <SkeletonTable
              columns={["Order Info", "	Products", "Total", "Payments", "	Paid"]}
            />
          ) : (
            RegisterClosureTransactions?.arr?.length > 0 && (
              <RegisterClosureTransactionsTable
                tableData={RegisterClosureTransactions}
              />
            )
          )}
          {!loading && !RegisterClosureTransactions?.arr?.length && (
            <NoDataFound />
          )}
        </Grid>
      </Grid>
    </>
  );
}
