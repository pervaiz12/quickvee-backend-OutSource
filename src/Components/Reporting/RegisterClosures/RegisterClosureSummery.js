import { Grid } from "@mui/material";
import React, { useState } from "react";
import leftArrow from "../../../Assests/Dashboard/Left.svg";
import { Link, useLocation } from "react-router-dom";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import PaymentsTable from "./PaymentsTable";
import StationStatus from "./StationStatus";

export default function RegisterClosureSummery() {
  const { LoginGetDashBoardRecordJson, userTypeData } = useAuthDetails();
  const merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  const storeData = JSON.parse(localStorage.getItem("AllStore") || "[]");
  

  const storeName = storeData.find(
    (store) => store.merchant_id === merchant_id
  )?.name;
  const location = useLocation();
  const { table } = location.state;
 
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
              // onClick={handleViewFullDetails}
            >
              <Link
                to={
                  "/store-reporting/register-closures/register-closures-transactions"
                }
                state={{...table, storeName: storeName}}
                className="CircularSTDMedium-16px underline text-[#0A64F9]"
                style={{ marginBottom: 0 }}
              >
                View full details
              </Link>
            </Grid>
          </Grid>
        </Grid>

        <StationStatus
          state={{...table,storeName:storeName}}
        />

        <Grid container className="box_shadow_div" sx={{ mt: 0 }}>
          
        </Grid>
        <Grid container className="box_shadow_div" sx={{ mt: 0 }}>
          <PaymentsTable />
        </Grid>
      </Grid>
    </>
  );
}
