import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import StoreCreditReportTable from "./StoreCreditReportTable";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import PasswordShow from "../../../Common/passwordShow";
import { fetchStoreCreditReportArr } from "../../../Redux/features/Reports/StoreCreditReport/StoreCreditReportSlice";
import { useDispatch } from "react-redux";
import { priceFormate } from "../../../hooks/priceFormate";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

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
  const [totalValueIssued, setTotalValueIssued] = useState(0);
  const [totalValueRedeemed, setTotalValueRedeemed] = useState(0);
  const [outStandingsBalance, setOutStandingsBalance] = useState(0);
  const dispatch = useDispatch();
  const StoreCreditReportReduxState = useSelector(
    (state) => state.storeCreditReportList
  );
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
      <Grid container sx={{ pt: 2.5, mt: 3.6 }} className="box_shadow_div ">
        <Grid item xs={12}>
          <Grid container sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item xs={12}>
              <h1 style={{ marginBottom: 0 }} className="heading ">
                Store Credit Report
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
                {!StoreCreditReportReduxState.loading ? (
                  <p>${priceFormate(totalValueIssued.toFixed(2))}</p>
                ) : (
                  <Skeleton />
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className="bg-white p-4 shadow-md rounded-lg opacity-100  h-30">
              <div className="font-normal  tracking-normal Admin_std">
                <p>Total value redeemed</p>
              </div>
              <div className="text-[20px] font-bold mt-4 common-font-bold">
                {!StoreCreditReportReduxState.loading ? (
                  <p>${priceFormate(totalValueRedeemed.toFixed(2))}</p>
                ) : (
                  <Skeleton />
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className="bg-white p-4 shadow-md rounded-lg opacity-100  h-30">
              <div className="font-normal  tracking-normal Admin_std">
                <p>OutStanding balance</p>
              </div>
              <div className="text-[20px] font-bold mt-4 common-font-bold">
                {!StoreCreditReportReduxState.loading ? (
                  <p>${priceFormate(outStandingsBalance.toFixed(2))}</p>
                ) : (
                  <Skeleton />
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <StoreCreditReportTable
        {...{
          totalValueIssued,
          totalValueRedeemed,
          outStandingsBalance,
          setTotalValueIssued,
          setTotalValueRedeemed,
          setOutStandingsBalance,
        }}
      />
    </>
  );
}
