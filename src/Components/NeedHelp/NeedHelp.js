import React from "react";
import { Grid } from "@mui/material";

const NeedHelp = () => {
  return (
    <div className="box_shadow_div_order">
      <Grid item className="q-category-bottom-header" xs={12}>
        <h1 className="text-xl font-medium">Need Help</h1>
      </Grid>

      <Grid container className="px-6">
        <Grid item xs={12}>
          <p className="text-lg mb-2">For any assistance please reach us on</p>
          <p className="font-normal text-base text-[15px] mb-1">
            <span className="font-medium text-[16px]">Email :- </span>
            support@quickvee.com
          </p>
          <p className="font-normal text-base text-[15px] mb-1">
            <span className="font-medium text-[16px]">Support number :- </span>
            925-271-9711 / 925-452-6016 / 925-203-1129
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default NeedHelp;
