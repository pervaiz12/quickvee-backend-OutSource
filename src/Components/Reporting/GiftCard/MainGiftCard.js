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
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";

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
  const GiftCardReportData = useSelector((state) => state.GiftCardReportList);

  const [totalValueIssued, setTotalValueIssued] = useState(0);
  const [totalValueRedeemed, setTotalValueRedeemed] = useState(0);
  const [outStandingsBalance, setOutStandingsBalance] = useState(0);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [searchRecord, setSearchRecord] = useState("");
  const debouncedValue = useDebounce(searchRecord);
  const handleSearchInputChange = (value) => {
    setSearchRecord(value);
  };
  useEffect(() => {
    const getGiftCardTableData = async () => {
      if (merchant_id) {
        try {
          let data = {
            merchant_id,
            gift_card_number: Boolean(debouncedValue.trim())
              ? debouncedValue
              : null,
            start_date: selectedDateRange.start_date,
            end_date: selectedDateRange.end_date,
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

    getGiftCardTableData();
  }, [merchant_id, debouncedValue, selectedDateRange]);

  // useEffect(() => {
  //   console.log("selectedDateRange: ", selectedDateRange);
  // }, [selectedDateRange]);

  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  return (
    <>
      <Grid container className="box_shadow_div ">
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ borderBottom: "1px solid #E8E8E8" }}
            >
              <Grid item xs={12} display="flex" justifyContent="space-between">
                <div className="q-category-bottom-header">
                  <span>Gift Card Report</span>
                </div>
                {GiftCardReportData.GiftCardReportData?.length ? (
                  <div className="q-category-bottom-header blue-text">
                    <span>
                      Gift Card in Circulation:{" "}
                      {GiftCardReportData.GiftCardReportData?.length || 0}
                    </span>
                  </div>
                ) : null}
              </Grid>
            </Grid>
          </Grid>

          <Grid container sx={{ px: 2.5, pt: 1, pb: 2.5 }}>
            <Grid item xs={12}>
              <h1 className="heading">Filter By</h1>
              <InputTextSearch
                placeholder={"Search for a gift card number"}
                value={searchRecord}
                handleChange={handleSearchInputChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {!searchRecord && (
        <>
          <Grid container sx={{ overflow: "unset" }} className="box_shadow_div">
            <Grid xs={12}>
              <DateRangeComponent onDateRangeChange={handleDateRangeChange} />
            </Grid>
          </Grid>
        </>
      )}

     

      <Grid item xs={12}>
        <Grid container sx={{ px: 0.5 }} spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <div className="bg-white p-4 shadow-md rounded-lg opacity-100  h-30">
              <div className="text-[26px] font-bold common-font-bold">
                {!GiftCardReportData.loading ? (
                  <p>
                    ${priceFormate(GiftCardReportData?.TotalDebit || "0.00")}
                  </p>
                ) : (
                  <Skeleton />
                )}
              </div>
              <div className="font-normal  tracking-normal Admin_std">
                <p>Total value Sold</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className="bg-white p-4 shadow-md rounded-lg opacity-100  h-30">
              <div className="text-[26px] font-bold common-font-bold">
                {!GiftCardReportData.loading ? (
                  <p>
                    ${priceFormate(GiftCardReportData?.TotalCredit || "0.00")}
                  </p>
                ) : (
                  <Skeleton />
                )}
              </div>
              <div className="font-normal  tracking-normal Admin_std">
                <p>Total value redeemed</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className="bg-white p-4 shadow-md rounded-lg opacity-100  h-30">
              <div className="text-[26px] font-bold common-font-bold">
                {!GiftCardReportData.loading ? (
                  <p>
                    ${priceFormate(GiftCardReportData?.Totalbalance || "0.00")}
                  </p>
                ) : (
                  <Skeleton />
                )}
              </div>
              <div className="font-normal  tracking-normal Admin_std">
                <p>OutStanding balance</p>
              </div>
            </div>
          </Grid>
          {/* <Grid item xs={12} sm={6} md={3}>
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
          </Grid> */}
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
