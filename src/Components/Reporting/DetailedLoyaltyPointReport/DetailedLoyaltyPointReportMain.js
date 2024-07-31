import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import DetailedLoyaltyReportTable from "./DetailedLoyaltyReportTable";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { useDispatch } from "react-redux";
import { fetchDetailedLoyaltyPointsReportArr } from "../../../Redux/features/Reports/DatailedLoyaltyPointsReport/DetailedLoyaltyPointsReportSlice";
import PasswordShow from "../../../Common/passwordShow";
import { useSelector } from "react-redux";
import { priceFormate } from "../../../hooks/priceFormate";
import Skeleton from "react-loading-skeleton";

export default function DetailedLoyaltyPointReportMain() {
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  const dispatch = useDispatch();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const DetailedLoyaltyPointsReduxState = useSelector(
    (state) => state.DetailedLoyaltyPointsReport
  );
  const [totalValueIssued, setTotalValueIssued] = useState(0);
  const [totalValueRedeemed, setTotalValueRedeemed] = useState(0);
  const [outStandingsBalance, setOutStandingsBalance] = useState(0);
  useEffect(() => {
    getDetailedLoyaltypointsTableData();
  }, [merchant_id]);
  const getDetailedLoyaltypointsTableData = async () => {
    if (merchant_id) {
      try {
        let data = {
          merchant_id,
          ...userTypeData,
        };

        if (data) {
          await dispatch(fetchDetailedLoyaltyPointsReportArr(data)).unwrap();
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
                Detailed Loyalty Points Report
              </h1>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container sx={{ px: 0.5 }} spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <div className="bg-white p-4 shadow-md rounded-lg opacity-100  h-30">
              <div className="font-normal  tracking-normal Admin_std">
                <p>Total value issued</p>
              </div>
              <div className="text-[20px] font-bold mt-4 common-font-bold">
                {!DetailedLoyaltyPointsReduxState.loading ? (
                  <p>{priceFormate(totalValueIssued.toFixed(2))}</p>
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
                {!DetailedLoyaltyPointsReduxState.loading ? (
                  <p>{priceFormate(totalValueRedeemed.toFixed(2))}</p>
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
                {!DetailedLoyaltyPointsReduxState.loading ? (
                  <p>{priceFormate(outStandingsBalance.toFixed(2))}</p>
                ) : (
                  <Skeleton />
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <DetailedLoyaltyReportTable
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
