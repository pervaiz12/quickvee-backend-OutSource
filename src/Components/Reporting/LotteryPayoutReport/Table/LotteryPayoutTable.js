import React from "react";
import { Grid } from "@mui/material";
import { SkeletonTable } from "../../../../reuseableComponents/SkeletonTable";
import Skeleton from "react-loading-skeleton";

function LotteryPayoutTable(props) {
  return (
    <>
      {props?.apiLoader ? (
        <Grid container className="box_shadow_div">
          <Grid item xs={12}>
            <div className="q-category-bottom-header">
              <div className="q_details_header ml-2">
                <Skeleton />
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <SkeletonTable columns={["Order ID", "Payout Amt", "Change Deu"]} />
          </Grid>
        </Grid>
      ) : (
        ""
      )}
    </>
  );
}

export default LotteryPayoutTable;
