import React from "react";
import ReorderInventoryList from "./ReorderInventoryList";
import { Grid } from "@mui/material";

const ReorderInventoryMain = () => {
  return (
    <>
      {/* <Grid
        container
        sx={{ padding: 2.5, mt: 3.6 }}
        className="box_shadow_div "
      >
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <h1 style={{ marginBottom: 0 }} className="heading ">
                Reorder Inventory Report
              </h1>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
      <ReorderInventoryList sx={{ padding: 2.5, mt: 3.6 }} />
    </>
  );
};

export default ReorderInventoryMain;
