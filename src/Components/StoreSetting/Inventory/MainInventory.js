import React from "react";
import InventoryView from "./InventoryView";
import { Grid } from "@mui/material";
function MainInventory() {
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
              <h1 style={{ marginBottom: 0 }} className="heading">
                Inventory
              </h1>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className="q-category-main-page">
        <InventoryView />
      </div>
    </>
  );
}

export default MainInventory;
