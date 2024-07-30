import { Grid } from "@mui/material";
import React from "react";
import DetailedLoyaltyReportTable from "./DetailedLoyaltyReportTable";

export default function DetailedLoyaltyPointReportMain() {
  return (
    <>
      <Grid container sx={{ pt: 2.5, mt: 3.6 }} className="box_shadow_div ">
        <Grid item xs={12}>
          <Grid container sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item xs={12}>
              <h1 style={{ marginBottom: 0 }} className="heading ">
                Detailed Loyalty Points Report
              </h1>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container sx={{ px:0.5 }} spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <div className="bg-white p-4 shadow-md rounded-lg opacity-100  h-30">
              <div className="font-normal  tracking-normal Admin_std">
                <p>Total value issued</p>
              </div>
              <div className="text-[20px] font-bold mt-4 common-font-bold">
                {/* {!StoreCreditReportReduxState.loading ? (
                  <p>${priceFormate(totalValueIssued.toFixed(2))}</p>
                ) : (
                  <Skeleton />
                )} */}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className="bg-white p-4 shadow-md rounded-lg opacity-100  h-30">
              <div className="font-normal  tracking-normal Admin_std">
                <p>Total value redeemed</p>
              </div>
              <div className="text-[20px] font-bold mt-4 common-font-bold">
                {/* {!StoreCreditReportReduxState.loading ? (
                  <p>${priceFormate(totalValueRedeemed.toFixed(2))}</p>
                ) : (
                  <Skeleton />
                )} */}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className="bg-white p-4 shadow-md rounded-lg opacity-100  h-30">
              <div className="font-normal  tracking-normal Admin_std">
                <p>OutStanding balance</p>
              </div>
              <div className="text-[20px] font-bold mt-4 common-font-bold">
                {/* {!StoreCreditReportReduxState.loading ? (
                  <p>${priceFormate(outStandingsBalance.toFixed(2))}</p>
                ) : (
                  <Skeleton />
                )} */}
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <DetailedLoyaltyReportTable />
    </>
  );
}
