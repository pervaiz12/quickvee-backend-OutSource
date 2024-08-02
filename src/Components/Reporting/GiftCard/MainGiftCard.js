import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import DetailedGiftCardReportTable from "./DetailedGiftCardReportTable";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { useDispatch } from "react-redux";
import { fetchGiftCardReportData } from "../../../Redux/features/Reports/GiftCard/GiftCardReportSlice";
import PasswordShow from "../../../Common/passwordShow";
import { useSelector } from "react-redux";
import { priceFormate } from "../../../hooks/priceFormate";
import Skeleton from "react-loading-skeleton";
import CustomHeader from "../../../reuseableComponents/CustomHeader";
import InputTextSearch from "../../../reuseableComponents/InputTextSearch";
import useDebounce from "../../../hooks/useDebouncs";

export default function MainGiftCard() {
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
  const GiftCardReportData = useSelector(
      (state) => state.GiftCardReportList
  );

  const [totalValueIssued, setTotalValueIssued] = useState(0);
  const [totalValueRedeemed, setTotalValueRedeemed] = useState(0);
  const [outStandingsBalance, setOutStandingsBalance] = useState(0);

  const [searchRecord, setSearchRecord] = useState("");
  const debouncedValue = useDebounce(searchRecord);
  const handleSearchInputChange = (value) => {
    setSearchRecord(value);
  };
  useEffect(() => {
    getGiftCardTableData();
  }, [merchant_id,debouncedValue]);
  const getGiftCardTableData = async () => {
    if (merchant_id) {
      try {
        let data = {
          merchant_id,
          gift_card_number:Boolean(debouncedValue.trim()) ? debouncedValue : null , // optional
          ...userTypeData,
        };

        if (data) {
          await dispatch(fetchGiftCardReportData(data)).unwrap();
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
      <Grid container sx={{ pt: 2.5 }} className="box_shadow_div ">
        <Grid item xs={12}>
          <CustomHeader>Gift Card Report</CustomHeader>

          <Grid container sx={{ px: 2.5, pt: 1,pb:2.5 }}>
            <Grid item xs={12}>
              <h1 className="heading">Filter By</h1>
              <InputTextSearch 
              placeholder={"Search for a Gift Card Number"}
              value={searchRecord}
              handleChange={handleSearchInputChange}
              />
            </Grid>
          </Grid>
          
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container sx={{ px: 0.5 }} spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <div className="bg-white p-4 shadow-md rounded-lg opacity-100  h-30">
              <div className="font-normal  tracking-normal Admin_std">
                <p>Total value Sold</p>
              </div>
              <div className="text-[20px] font-bold mt-4 common-font-bold">
                {!GiftCardReportData.loading? (
                  <p>${priceFormate(GiftCardReportData?.TotalDebit || "0.00")}</p>
                ) : (
                  <Skeleton />
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className="bg-white p-4 shadow-md rounded-lg opacity-100  h-30">
              <div className="font-normal  tracking-normal Admin_std">
                <p>Total value redeemed</p>
              </div>
              <div className="text-[20px] font-bold mt-4 common-font-bold">
                {!GiftCardReportData.loading ? (
                  <p>${priceFormate(GiftCardReportData?.TotalCredit || "0.00")}</p>
                ) : (
                  <Skeleton />
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className="bg-white p-4 shadow-md rounded-lg opacity-100  h-30">
              <div className="font-normal  tracking-normal Admin_std">
                <p>OutStanding balance</p>
              </div>
              <div className="text-[20px] font-bold mt-4 common-font-bold">
                {!GiftCardReportData.loading ? (
                  <p>${priceFormate(GiftCardReportData?.Totalbalance || "0.00")}</p>
                ) : (
                  <Skeleton />
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className="bg-white p-4 shadow-md rounded-lg opacity-100  h-30">
              <div className="font-normal  tracking-normal Admin_std">
                <p>Gift Card in Circulation</p>
              </div>
              <div className="text-[20px] font-bold mt-4 common-font-bold">
                {!GiftCardReportData.loading ? (
                  <p>{GiftCardReportData.GiftCardReportData?.length || 0}</p>
                ) : (
                  <Skeleton />
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <DetailedGiftCardReportTable
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
