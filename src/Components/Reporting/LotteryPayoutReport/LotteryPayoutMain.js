import React from "react";
import Grid from "@mui/system/Unstable_Grid/Grid";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import LotteryPayoutLogic from "./LotteryPayoutLogic";
import LotteryPayoutTable from "./Table/LotteryPayoutTable";

export default function LotteryPayoutMain() {
  const {
    onDateRangeChange,
    getAllLatteryData,
    apiLoader,
    merchant_id,
    setAllLatteryData,
  } = LotteryPayoutLogic();
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
                Lottery Payout Report
              </h1>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ paddingY: 3.7 }}>
        <Grid item xs={12}>
          <DateRangeComponent onDateRangeChange={onDateRangeChange} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {/* <Grid container>
          <Grid item xs={12}> */}
        <LotteryPayoutTable
          apiLoader={apiLoader}
          getAllLatteryData={getAllLatteryData}
          merchant_id={merchant_id}
          setAllLatteryData={setAllLatteryData}
        />
        {/* </Grid>
        </Grid> */}
      </Grid>
    </>
  );
}
