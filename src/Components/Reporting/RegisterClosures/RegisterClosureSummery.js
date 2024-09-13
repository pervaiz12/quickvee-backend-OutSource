import { Grid } from "@mui/material";
import React, { useState } from "react";
import leftArrow from "../../../Assests/Dashboard/Left.svg";
import { Link, useLocation } from "react-router-dom";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import PaymentsTable from "./PaymentsTable";
import { formatDateTime } from "../../../Constants/utils";
import axios from "axios";
import {
  BASE_URL,
  GET_SHIFT_SUMMARY_REPORT_ORDER_DETAILS,
} from "../../../Constants/Config";
import RegisterClosureTransactionsTable from "./RegisterClosureTransactionsTable";

export default function RegisterClosureSummery() {
  const { LoginGetDashBoardRecordJson, userTypeData } = useAuthDetails();
  const merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  const storeData = JSON.parse(localStorage.getItem("AllStore") || "[]");
  const [RegisterClosureTransactions, setRegisterClosureTransactions] =
    useState({ arr: [], status: false });

  const storeName = storeData.find(
    (store) => store.merchant_id === merchant_id
  )?.name;
  const location = useLocation();
  const { table } = location.state;
  const handleViewFullDetails = async () => {
    if (table) {
      try {
        const data = {
          shift_start_date: table?.in_time,
          shift_end_date: table?.out_time,
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
        console.log(response);
        if (response.data.status === true) {
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
    }
  };
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
                  Register Closures Summary
                </p>
              </Link>
            </Grid>
            <Grid
              item
              className="cursor-pointer"
              onClick={handleViewFullDetails}
            >
              <p
                className="CircularSTDMedium-16px underline text-[#0A64F9]"
                style={{ marginBottom: 0 }}
              >
                View full details
              </p>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{ padding: 2.5, mt: 2.5 }}
          className="box_shadow_div"
        >
          <Grid item xs={12}>
            <Grid container>
              {[
                { label: "Register", value: "Main Register" },
                { label: "Opened", value: formatDateTime(table?.in_time) },
                {
                  label: "Closed",
                  value:
                    table?.out_time === "Open"
                      ? "Still Open"
                      : formatDateTime(table?.out_time),
                },
              ].map(({ label, value }) => (
                <Grid item xs={3} key={label} sx={{ display: "flex", gap: 1 }}>
                  <p className="text-[#7E7E7E] CircularSTDBook-15px">
                    {label}:
                  </p>
                  <p className="text-[#000000] CircularSTDBook-15px">{value}</p>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2.5 }}>
            <Grid item xs={3} sx={{ display: "flex", gap: 1 }}>
              <p className="text-[#7E7E7E] CircularSTDBook-15px">Outlet:</p>
              <p className="text-[#000000] CircularSTDBook-15px">{storeName}</p>
            </Grid>
          </Grid>
        </Grid>

        <Grid container className="box_shadow_div" sx={{ mt: 0 }}>
          <RegisterClosureTransactionsTable
            tableData={RegisterClosureTransactions}
          />
        </Grid>
        <Grid container className="box_shadow_div" sx={{ mt: 0 }}>
          <PaymentsTable />
        </Grid>
      </Grid>
    </>
  );
}
