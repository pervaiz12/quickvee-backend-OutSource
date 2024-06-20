import React from "react";
import SettingStoreAlters from "../StoreAlters/SettingStoreAlters";
import { Grid } from "@mui/material";

const MainStoreAlters = () => {
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
                Alerts
              </h1>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <SettingStoreAlters />
    </>
  );
};

export default MainStoreAlters;
