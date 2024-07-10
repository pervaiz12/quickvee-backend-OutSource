import React from "react";
import SystemView from "./SystemView";
import { Grid } from "@mui/material";

const MainSyastemAccess = () => {
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
              <h1 style={{ marginBottom: 0 }} className="heading">
                System Access
              </h1>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
      <div className="q-attributes-main-page">
        <SystemView />
      </div>
    </>
  );
};

export default MainSyastemAccess;
