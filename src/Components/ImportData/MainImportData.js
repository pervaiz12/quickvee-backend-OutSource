import React from "react";
import ImportData from "./ImportData";
import Csvimport from "./Csvimport";
import { Grid } from "@mui/material";

const MainImportData = () => {
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
                Import Data
              </h1>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className="q-order-main-page">
        <ImportData />
      </div>
      <div className="q-order-main-page">
        <Csvimport />
      </div>
    </>
  );
};

export default MainImportData;
